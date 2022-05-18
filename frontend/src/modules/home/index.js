import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import snakOptions from "../../constants/snakOptions";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SavedSearchSharpIcon from '@mui/icons-material/SavedSearchSharp';
import { SliderThumb } from "@mui/material";
import { Slider } from "@mui/material";
import queryString from 'query-string';
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Paper } from "@mui/material";
import { Pagination } from "@mui/material";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Grid } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CLOTHES_IMAGE } from "../../constants/api";
import { Stack } from "@mui/material";
import { ItemsContext } from "./context";
import { getAllTags, getMinMaxPrice } from "./services";
import { useSnackbar } from "react-simple-snackbar";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



function AddToCartModal({ item, open, handleClose }) {
  const { addToCart } = useContext(ItemsContext);
  const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
  const [quantity, setQuantity] = useState(0);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography>Enter the amount to add</Typography>
        <Input
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          type="number"
        />
        <br></br>
        <Button
          onClick={() => {
            addToCart(item, quantity).then(() => {
              openSnackbar(`Added ${quantity} ${item.item_name}  to cart successfully`);
            });
          }}
        >
          Add
        </Button>
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    height: 450,
  },

  media: {
    maxWidth: 300,
    height: 250,
  },
}));

function ProductCard({ item, setItem, handleAddCart, handleProductModal }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${CLOTHES_IMAGE}${item._id}/${item.files[0]}`}
        alt="Clothe Image"
      />
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item xs={12}>
            <Typography variant="body2">{item.item_name}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Rs. {item.item_price}
            </Typography>
          </Grid>
          <Grid item>
            <Stack sx={{ mt: 2 }} direction="row" gap={2}>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setItem(item);
                  handleAddCart();
                }}
              >
                Add to Cart
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setItem(item);
                  handleProductModal();
                }}
              >
                View More
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { refreshData, items, pagination, listItems, search, setSearch } = useContext(ItemsContext);
  const [item, setItem] = useState({});
  const [current, setCurrent] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [openAddCart, setOpenAddCart] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [category, setCategory] = React.useState('');

  const [priceRange, setPriceRange] = React.useState([20, 1000]);
  const [minMaxPrice, setMinMaxPrice] = React.useState([0, 0]);
  const [tags, setTags] = useState([]);
  const [priceExpanded, setPriceExpanded] = useState(false);

  useEffect(() => {
    const query = queryString.parse(window.location.search);

    getMinMaxPrice().then(res => {
      setMinMaxPrice([res.min, res.max])
    });

    if (query["category"]) {
      setCategory(query["category"]);
    }
    if (query["min_price"] && query["max_price"]) {
      setPriceRange([Number(query["min_price"]), Number(query["max_price"])]);
      setPriceExpanded(true);
    }

    if (query["search"]) {
      setSearchText(query["search"]);
    }

    let page = 0

    if (query["page"]) {
      page = Number(query["page"]);
    } else {
      page = 1;
    }

    let _start = (page - 1) * pagination.limit;
    setCurrent(page);

    getAllTags().then(data => {
      setTags(data);
    });

    return loadItemsList({
      start: _start,
      limit: pagination.limit,
      ...query
    })
  }, [])


  const loadItemsList = query => {
    if (!query) query = null;
    listItems(query).then().catch(() => {
      console.log("error");
    });
  }


  function handleAddCartClose() {
    setOpenAddCart(!openAddCart);
  }

  function handleProductModalClose() {
    setOpenProductModal(!openProductModal);
  }

  const modal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 950,
    height: 550,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleChangeRange(event, newValue) {
    setPriceRange(newValue);
  }

  function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }

  return (
    <Box >
      <Item >
        <Grid container gap={3} sx={{ alignItems: "center", justifyContent: "center" }}>
          {searchText ? (
            <Grid item>
              <Typography variant="subtitle2">Search results for "{searchText}"</Typography>
            </Grid>
          ) : ""}
          <Grid item>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
              <InputLabel>Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                value={category}
              >
                <MenuItem value="" onClick={() => {
                  const parsed = queryString.parse(window.location.search);
                  delete parsed["category"];
                  window.location.search = queryString.stringify(parsed);
                }}>
                  <em>None</em>
                </MenuItem>
                {tags.map((t) => {
                  return (
                    <MenuItem onClick={() => {
                      const parsed = queryString.parse(window.location.search);
                      delete parsed["search"];
                      parsed["category"] = t;
                      window.location.search = queryString.stringify(parsed);
                    }} key={t} value={t}>{t}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ width: 300 }}>
            <Accordion expanded={priceExpanded} onClick={() => {
              setPriceExpanded(!priceExpanded)
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography gutterBottom>Select price range</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AirbnbSlider
                  size="small"
                  components={{ Thumb: AirbnbThumbComponent }}
                  getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                  onChange={handleChangeRange}
                  max={minMaxPrice[1]}
                  min={minMaxPrice[0]}
                  value={priceRange}
                  valueLabelDisplay="auto"
                />
                <Typography>Rs. {priceRange[0]} - {priceRange[1]}</Typography>
                <Button variant="contained" color="secondary" onClick={() => {
                  const parsed = queryString.parse(window.location.search);
                  parsed["min_price"] = priceRange[0];
                  parsed["max_price"] = priceRange[1];
                  parsed["page"] = 1;
                  window.location.search = queryString.stringify(parsed);
                }}>
                  <SavedSearchSharpIcon />
                </Button>
                {' '}
                <Button variant="contained" color="secondary" onClick={() => {
                  const parsed = queryString.parse(window.location.search);
                  delete parsed["min_price"];
                  delete parsed["max_price"];
                  parsed["page"] = 1;
                  window.location.search = queryString.stringify(parsed);
                }}>
                  <HighlightOffIcon />
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Item>
      <Box p={5} sx={{ margin: "80px" }}>
        <Grid
          container
          spacing={8}
        >
          {items.map((item) => {
            return (
              <Grid key={item._id} item>
                <ProductCard
                  key={item._id}
                  item={item}
                  setItem={setItem}
                  handleAddCart={handleAddCartClose}
                />
              </Grid>
            );
          })}
          <AddToCartModal
            item={item}
            open={openAddCart}
            handleClose={handleAddCartClose}
          />
        </Grid>
      </Box>
      <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
        <Grid item>
          <Pagination count={Math.round(items.length / pagination.limit) + 1} page={current} onChange={(e, v) => {
            const parced = queryString.parse(window.location.search);
            parced["page"] = v;
            window.location.search = queryString.stringify(parced);
          }} shape="rounded" />
        </Grid>
      </Grid>
    </Box >
  );
}
