import React, { useContext, useState, useEffect } from "react"
import { ItemsContext } from "./context";
import ClothProductList from "../../components/shop/ClothProductList"
import { styled } from "@mui/styles";
import {  Grid, Pagination, Typography, Select, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, AccordionDetails, Slider, SliderThumb } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SavedSearchSharpIcon from '@mui/icons-material/SavedSearchSharp';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import queryString from 'query-string';
import { getAllTags, getMinMaxPrice } from "./services";



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

export default function Home() {
  const { items,  pagination, listItems } = useContext(ItemsContext);
  const [priceRange, setPriceRange] = React.useState([20, 1000]);
  const [minMaxPrice, setMinMaxPrice] = React.useState([0, 0]);
  const [tags, setTags] = useState([]);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [category, setCategory] = React.useState('');
  const [searchText, setSearchText] = useState("");
  const [current, setCurrent] = useState(0);

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

    listItems({
      start: _start,
      limit: pagination.limit,
      ...query
    })
  }, [pagination.limit ])


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
    <Grid container spacing={3} sx={{ maxWidth: 1545 }}>
      <Grid item xs={12}>
        <Grid container gap={3} sx={{ alignItems: "center", justifyContent: "right", pr: 5 }}>
          {searchText ? (
            <Grid item>
              <Typography variant="subtitle2">Search results for "{searchText}"</Typography>
            </Grid>
          ) : ""}
          <Grid item>
            <FormControl variant="filled">
              <InputLabel sx={{ fontSize: 15 }}>Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                autoWidth
                value={category}
                sx={{ maxWidth: 200, width: 200, height: 50, maxHeight: 50 }}
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
          <Grid item sx={{ width: 250 }}>
            <Accordion expanded={priceExpanded} onClick={() => {
              setPriceExpanded(!priceExpanded)
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ fontSize: 15 }}>Select price range</Typography>
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
      </Grid>
      <Grid item xs={12}>
        <ClothProductList cloths={items} />
      </Grid>

      <Grid item xs={12}>
        <Grid container sx={{ alignItems: "center", justifyContent: "center", padding: 5 }}>
          <Grid item>
            <Pagination count={Math.round(items.length / pagination.limit) + 1} page={current} onChange={(e, v) => {
              const parced = queryString.parse(window.location.search);
              parced["page"] = v;
              window.location.search = queryString.stringify(parced);
            }} shape="rounded" />
          </Grid >
        </Grid >
      </Grid>
    </Grid >
  )
}



