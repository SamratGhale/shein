// import React, { useContext, useEffect, useState } from "react";
// import Card from "@mui/material/Card";
// import snakOptions from "../../constants/snakOptions";
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import SavedSearchSharpIcon from '@mui/icons-material/SavedSearchSharp';
// import { SliderThumb } from "@mui/material";
// import { Slider } from "@mui/material";
// import queryString from 'query-string';
// import { FormControl } from "@mui/material";
// import { InputLabel } from "@mui/material";
// import { Select } from "@mui/material";
// import { MenuItem } from "@mui/material";
// import { Paper } from "@mui/material";
// import { Pagination } from "@mui/material";
// import { Modal } from "@mui/material";
// import { Box } from "@mui/system";
// import { ButtonGroup } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { Input } from "@mui/material";
// import { makeStyles, styled } from "@mui/styles";
// import { Grid } from "@mui/material";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { CLOTHES_IMAGE } from "../../constants/api";
// import { Stack } from "@mui/material";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import MobileStepper from "@mui/material/MobileStepper";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
// import CloseIcon from "@mui/icons-material/Close";

// import { ItemsContext } from "./context";
// import { getAllTags, getMinMaxPrice } from "./services";
// import { useSnackbar } from "react-simple-snackbar";

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const AirbnbSlider = styled(Slider)(({ theme }) => ({
//   color: '#3a8589',
//   height: 3,
//   padding: '13px 0',
//   '& .MuiSlider-thumb': {
//     height: 27,
//     width: 27,
//     backgroundColor: '#fff',
//     border: '1px solid currentColor',
//     '&:hover': {
//       boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
//     },
//     '& .airbnb-bar': {
//       height: 9,
//       width: 1,
//       backgroundColor: 'currentColor',
//       marginLeft: 1,
//       marginRight: 1,
//     },
//   },
//   '& .MuiSlider-track': {
//     height: 3,
//   },
//   '& .MuiSlider-rail': {
//     color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
//     opacity: theme.palette.mode === 'dark' ? undefined : 1,
//     height: 3,
//   },
// }));

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));



// function AddToCartModal({ item, open, handleClose }) {
//   const { addToCart } = useContext(ItemsContext);
//   const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
//   const [quantity, setQuantity] = useState(0);
//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <Typography>Enter the amount to add</Typography>
//         <Input
//           value={quantity}
//           onChange={(e) => {
//             setQuantity(e.target.value);
//           }}
//           type="number"
//         />
//         <br></br>
//         <Button
//           onClick={() => {
//             addToCart(item, quantity).then(() => {
//               openSnackbar(`Added ${quantity} ${item.item_name}  to cart successfully`);
//             });
//           }}
//         >
//           Add
//         </Button>
//       </Box>
//     </Modal>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 300,
//     height: 450,
//   },

//   media: {
//     maxWidth: 300,
//     height: 250,
//   },
// }));

// function ProductCard({ item, setItem, handleAddCart, handleProductModal }) {
//   const classes = useStyles();
//   return (
//     <Card className={classes.root}>
//       <CardMedia
//         className={classes.media}
//         image={`${CLOTHES_IMAGE}${item._id}/${item.files[0]}`}
//         alt="Clothe Image"
//       />
//       <CardContent>
//         <Grid
//           container
//           spacing={2}
//           sx={{ alignItems: "center", justifyContent: "center" }}
//         >
//           <Grid item xs={12}>
//             <Typography variant="body2">{item.item_name.slice(0, 40)}{item.item_name.length > 40 ? "..." : ""}</Typography>
//             <Typography variant="subtitle2" sx={{ mt: 2 }}>
//               Rs. {item.item_price}
//             </Typography>
//           </Grid>
//           <Grid item>
//             <Stack sx={{ mt: 2 }} direction="row" gap={2}>
//               <Button
//                 size="small"
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => {
//                   setItem(item);
//                   handleAddCart();
//                 }}
//               >
//                 Add to Cart
//               </Button>
//               <Button
//                 size="small"
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => {
//                   setItem(item);
//                   handleProductModal();
//                 }}
//               >
//                 View More
//               </Button>
//             </Stack>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// }

// //Product ko modal

// const modal = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 1200,
//   height: 600,
//   maxHeight: 600,
//   maxWidth: 1200,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   borderRadius: 15,
//   boxShadow: 24,
//   p: 4,
// };

// function ProductModal({ item, open, handleClose }) {
//   console.log(item);
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return item ? (
//     <Modal open={open} onClose={handleClose}>
//       <Grid
//         container
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 1350,
//           height: 550,
//           bgcolor: "background.paper",
//           border: "2px solid #000",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 15,
//         }}
//         gap={4}
//         columns={16}
//         direction="row"
//       >
//         <Grid item xs={6}>
//           {/* Swipeable vies bascha */}
//           <Box sx={{ padding: 2, height: 340, width: 450, mt: 4 }}>
//             <AutoPlaySwipeableViews
//               axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//               index={activeStep}
//               onChangeIndex={handleStepChange}
//               enableMouseEvents
//             >
//               {item.files.map((step, index) => (
//                 <div key={step}>
//                   {Math.abs(activeStep - index) <= 2 ? (
//                     <Box
//                       component="img"
//                       sx={{
//                         overflow: "hidden",
//                         width: 410,
//                         height: 330,
//                         // maxWidth: 330,
//                         // maxHeight: 350,
//                       }}
//                       src={`${CLOTHES_IMAGE}${item._id}/${item.files[0]}`}
//                     />
//                   ) : null}
//                 </div>
//               ))}
//             </AutoPlaySwipeableViews>
//             <MobileStepper
//               steps={item.files.length}
//               position="static"
//               activeStep={activeStep}
//               nextButton={
//                 <Button
//                   sx={{ fontWeight: "bold" }}
//                   size="small"
//                   onClick={handleNext}
//                   disabled={activeStep === item.files.length - 1}
//                 >
//                   Next
//                   {theme.direction === "rtl" ? (
//                     <KeyboardArrowLeft />
//                   ) : (
//                     <KeyboardArrowRight />
//                   )}
//                 </Button>
//               }
//               backButton={
//                 <Button
//                   size="small"
//                   sx={{ fontWeight: "bold" }}
//                   onClick={handleBack}
//                   disabled={activeStep === 0}
//                 >
//                   {theme.direction === "rtl" ? (
//                     <KeyboardArrowRight />
//                   ) : (
//                     <KeyboardArrowLeft />
//                   )}
//                   Back
//                 </Button>
//               }
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={8}>
//           <Typography sx={{ fontFamily: "Nunito", mb: 4 }} variant="h4">
//             {item.item_name}
//           </Typography>
//           <Typography variant="subtitle2" sx={{ mb: 5 }}>
//             Tags:
//             {item.tags.map((tag) => {
//               return (
//                 <ButtonGroup size="small" variant="contained">
//                   <Button
//                     sx={{
//                       ml: 1,
//                       fontSize: "12px",
//                       backgroundColor: "black",
//                       color: "white",
//                     }}
//                   >
//                     {tag}
//                   </Button>
//                 </ButtonGroup>
//               );
//             })}
//           </Typography>
//           <Typography
//             sx={{ fontFamily: "Nunito", color: "green" }}
//             variant="h4"
//           >
//             Rs. {item.item_price}
//           </Typography>
//           <Typography variant="body1" sx={{ fontWeight: "bold" }}>
//             <del>Rs.{item.item_price}</del> -{item.discount}%
//           </Typography>
//           <Grid container sx={{ mt: 8, alignItems: "center" }} gap={3}>
//             <Grid item>
//               <Typography variant="body1">Quantity</Typography>
//             </Grid>
//             <Grid item>
//               <Stack spacing={2} direction="row">
//                 <Button size="small" variant="contained">
//                   <RemoveIcon sx={{ color: "black" }} />
//                 </Button>
//                 <Typography sx={{ pt: 1 }}>N</Typography>
//                 <Button size="medium" variant="contained">
//                   <AddIcon sx={{ color: "black" }} />
//                 </Button>
//               </Stack>
//             </Grid>
//           </Grid>
//           <Grid container columns={16} sx={{ mt: 6 }}>
//             <Grid item xs={8}>
//               <Button sx={{ width: "85%", height: 75 }} variant="contained">
//                 Buy Now
//               </Button>
//             </Grid>
//             <Grid item xs={8}>
//               <Button sx={{ width: "85%", height: 75 }} variant="contained">
//                 Add to Cart
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={1}>
//           <CloseIcon sx={{ ml: 6 }} />
//         </Grid>
//       </Grid>
//     </Modal>
//   ) : (
//     "loading"
//   );
// }

// //..
// export default function Home() {
//   const { refreshData, items, pagination, listItems, search, setSearch } = useContext(ItemsContext);
//   const [item, setItem] = useState({});
//   const [current, setCurrent] = useState(0);
//   const [searchText, setSearchText] = useState("");
//   const [openAddCart, setOpenAddCart] = useState(false);
//   const [openProductModal, setOpenProductModal] = useState(false);
//   const [category, setCategory] = React.useState('');

//   const [priceRange, setPriceRange] = React.useState([20, 1000]);
//   const [minMaxPrice, setMinMaxPrice] = React.useState([0, 0]);
//   const [tags, setTags] = useState([]);
//   const [priceExpanded, setPriceExpanded] = useState(false);

//   useEffect(() => {
//     const query = queryString.parse(window.location.search);

//     getMinMaxPrice().then(res => {
//       setMinMaxPrice([res.min, res.max])
//     });

//     if (query["category"]) {
//       setCategory(query["category"]);
//     }
//     if (query["min_price"] && query["max_price"]) {
//       setPriceRange([Number(query["min_price"]), Number(query["max_price"])]);
//       setPriceExpanded(true);
//     }

//     if (query["search"]) {
//       setSearchText(query["search"]);
//     }

//     let page = 0

//     if (query["page"]) {
//       page = Number(query["page"]);
//     } else {
//       page = 1;
//     }

//     let _start = (page - 1) * pagination.limit;
//     setCurrent(page);

//     getAllTags().then(data => {
//       setTags(data);
//     });

//     return loadItemsList({
//       start: _start,
//       limit: pagination.limit,
//       ...query
//     })
//   }, [])

//   const loadItemsList = (query) => {
//     if (!query) query = null;
//     listItems(query)
//       .then()
//       .catch(() => {
//         console.log("error");
//       });
//   };


//   function handleAddCartClose() {
//     setOpenAddCart(!openAddCart);
//   }

//   // for toggling product modal
//   function handleProductModalClose() {
//     setOpenProductModal(!openProductModal);
//   }

//   const modal = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 950,
//     height: 550,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   function handleChangeRange(event, newValue) {
//     setPriceRange(newValue);
//   }

//   function AirbnbThumbComponent(props) {
//     const { children, ...other } = props;
//     return (
//       <SliderThumb {...other}>
//         {children}
//         <span className="airbnb-bar" />
//         <span className="airbnb-bar" />
//         <span className="airbnb-bar" />
//       </SliderThumb>
//     );
//   }

//   useEffect(() => {
//     refreshData();
//     console.log(items);
//   }, []);

//   return (
//     <Box >
// <Item >
//   <Grid container gap={3} sx={{ alignItems: "center", justifyContent: "center" }}>
//     {searchText ? (
//       <Grid item>
//         <Typography variant="subtitle2">Search results for "{searchText}"</Typography>
//       </Grid>
//     ) : ""}
//     <Grid item>
//       <FormControl variant="filled" sx={{ m: 1, minWidth: 300 }}>
//         <InputLabel>Select Category</InputLabel>
//         <Select
//           labelId="demo-simple-select-autowidth-label"
//           id="demo-simple-select-autowidth"
//           autoWidth
//           value={category}
//         >
//           <MenuItem value="" onClick={() => {
//             const parsed = queryString.parse(window.location.search);
//             delete parsed["category"];
//             window.location.search = queryString.stringify(parsed);
//           }}>
//             <em>None</em>
//           </MenuItem>
//           {tags.map((t) => {
//             return (
//               <MenuItem onClick={() => {
//                 const parsed = queryString.parse(window.location.search);
//                 delete parsed["search"];
//                 parsed["category"] = t;
//                 window.location.search = queryString.stringify(parsed);
//               }} key={t} value={t}>{t}</MenuItem>
//             )
//           })}
//         </Select>
//       </FormControl>
//     </Grid>
//     <Grid item sx={{ width: 300 }}>
//       <Accordion expanded={priceExpanded} onClick={() => {
//         setPriceExpanded(!priceExpanded)
//       }}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography gutterBottom>Select price range</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <AirbnbSlider
//             size="small"
//             components={{ Thumb: AirbnbThumbComponent }}
//             getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
//             onChange={handleChangeRange}
//             max={minMaxPrice[1]}
//             min={minMaxPrice[0]}
//             value={priceRange}
//             valueLabelDisplay="auto"
//           />
//           <Typography>Rs. {priceRange[0]} - {priceRange[1]}</Typography>
//           <Button variant="contained" color="secondary" onClick={() => {
//             const parsed = queryString.parse(window.location.search);
//             parsed["min_price"] = priceRange[0];
//             parsed["max_price"] = priceRange[1];
//             parsed["page"] = 1;
//             window.location.search = queryString.stringify(parsed);
//           }}>
//             <SavedSearchSharpIcon />
//           </Button>
//           {' '}
//           <Button variant="contained" color="secondary" onClick={() => {
//             const parsed = queryString.parse(window.location.search);
//             delete parsed["min_price"];
//             delete parsed["max_price"];
//             parsed["page"] = 1;
//             window.location.search = queryString.stringify(parsed);
//           }}>
//             <HighlightOffIcon />
//           </Button>
//         </AccordionDetails>
//       </Accordion>
//     </Grid>
//   </Grid>
// </Item>

//       <Box p={5} sx={{ margin: "80px" }}>
//         <Grid
//           container
//           spacing={8}
//         >
//           {items
//             ? items.map((item) => {
//               return (
//                 <Grid key={item._id} item>
//                   <ProductCard
//                     key={item._id}
//                     item={item}
//                     setItem={setItem}
//                     handleAddCart={handleAddCartClose}
//                     handleProductModal={handleProductModalClose}
//                   />
//                 </Grid>
//               );
//             })
//             : ""}

//           <AddToCartModal
//             item={item}
//             open={openAddCart}
//             handleClose={handleAddCartClose}
//           />
//           {item.item_name ? (
//             <ProductModal
//               item={item}
//               open={openProductModal}
//               handleClose={handleProductModalClose}
//             />
//           ) : (
//             ""
//           )}
//         </Grid>
//       </Box>
//       <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
//         <Grid item>
//           <Pagination count={Math.round(items.length / pagination.limit) + 1} page={current} onChange={(e, v) => {
//             const parced = queryString.parse(window.location.search);
//             parced["page"] = v;
//             window.location.search = queryString.stringify(parced);
//           }} shape="rounded" />
//         </Grid >
//       </Grid >
//     </Box >
//   );
// }


import React, { useContext, useState, useEffect } from "react"
import { ItemsContext } from "./context";
import ClothProductList from "../../components/shop/ClothProductList"
import { Container, Stack } from "@mui/material";
import ClothProductSort from "../../components/shop/ClothProductSort";
import { styled } from "@mui/styles";
import { Paper, Grid, Pagination, Typography, Select, FormControl, InputLabel, MenuItem, Button, Accordion, AccordionSummary, AccordionDetails, Slider, SliderThumb } from "@mui/material";
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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Home() {



  const { items, refreshData, pagination, search, setSearch, listItems } = useContext(ItemsContext);
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

    return loadItemsList({
      start: _start,
      limit: pagination.limit,
      ...query
    })
  }, [])

  const loadItemsList = (query) => {
    if (!query) query = null;
    listItems(query)
      .then(
        console.log(query)
      )
      .catch(() => {
        console.log("error");
      });
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



