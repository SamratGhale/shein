import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
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
import { CardActionArea } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { CLOTHES_IMAGE } from "../../constants/api";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Stack } from "@mui/material";

import { ItemsContext } from "./context";

import { ButtonGroup } from "@mui/material";
import { getAllTags } from "./services";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
            addToCart(item, quantity);
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

  useEffect(() => {
    const query = queryString.parse(window.location.search);

    let page = 0

    if (query["page"]) {
      page = Number(query["page"]);
    } else {
      page = 1;
    }

    let _start = (page - 1) * pagination.limit;
    setCurrent(page);



    getAllTags().then(data => {
      console.log(data)
      setTags(data);
    });

    return loadItemsList({
      start: _start,
      limit: pagination.limit,
      ...query
    })
  }, [])

  const handlePagination = current_page => {
  }

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
  const [category, setCategory] = React.useState('');

  const [tags, setTags] = useState([]);
  return (
    <Box>
      <Item >
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Select Category</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            autoWidth
            value={category}
            label="Select Category"
          >
            <MenuItem value="">
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
    </Box>
  );
}
