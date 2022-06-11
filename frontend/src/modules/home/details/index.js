import { CardContent, Typography } from "@mui/material";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { PATH_APP } from "../../../routes/paths";
import { ItemsContext } from "../context";
import { Grid, Box, Button, Card, ButtonGroup, Stack, Modal, Input } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { CLOTHES_IMAGE } from "../../../constants/api";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSnackbar } from "react-simple-snackbar";
import snakOptions from "../../../constants/snakOptions";



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

const ItemDetail = (params) => {
  const { getById } = useContext(ItemsContext);
  const paths = window.location.pathname.split("/");
  const id = paths[paths.length - 1];
  const [item, setItem] = useState(null);

  const [openAddCart, setOpenAddCart] = useState(false);





  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getById(id);
        setItem(res);
      } catch (err) {
        console.log(err);
        window.location = PATH_APP.root;
      }
    };
    init();
  }, []);

  // const classes = useStyles();

  function handleAddCartClose() {
    setOpenAddCart(!openAddCart);
  }


  return item ? (

    <Grid
      container
      sx={{ alignItems: "center", justifyContent: "center", ml: 3 }}
      gap={6}
      columns={16}
    >
      <Grid xs={4} item sx={{ backgroundColor: "white" }}>
        <Box sx={{ padding: 2, height: 450, width: 500 }}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {item.files.map((step, index) => (
              <div key={step}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      overflow: "hidden",
                      width: 460,
                      height: 350,
                      // maxWidth: 400,
                      // maxHeight: 376,
                    }}
                    src={`${CLOTHES_IMAGE}${item._id}/${item.files[0]}`}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={item.files.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                sx={{ fontWeight: "bold" }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === item.files.length - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                sx={{ fontWeight: "bold" }}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Card
          sx={{
            maxHeight: 600,
            maxWidth: 1150,
            backgroundColor: "white",
            color: "black",
            padding: "12px",
            fontFamily: "Nunito",
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ mb: 4 }}>
              {item.item_name}
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 5 }}>
              Tags:
              {item.tags.map((tag) => {
                return (
                  <ButtonGroup key={tag} size="small" variant="contained">
                    <Button
                      sx={{
                        ml: 1,
                        fontSize: "12px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      {tag}
                    </Button>
                  </ButtonGroup>
                );
              })}
            </Typography>
            <Typography variant="h3" sx={{ color: "green" }}>
              Rs.{item.item_price}
            </Typography>
            <Typography variant="body1">
              <del>Rs.{item.item_price}</del>
              <Typography sx={{ ml: 1, fontWeight: "bold" }} variant="">
                -{item.discount}%
              </Typography>
            </Typography>
            {/* //quantity ko lagi */}
            <Grid container sx={{ mt: 8, alignItems: "center" }} gap={3}>
              <Grid item>
                <Typography variant="body1">Quantity</Typography>
              </Grid>
              <Grid item>
                <Stack spacing={2} direction="row">
                  <Button size="small" variant="contained">
                    <RemoveIcon sx={{ color: "black" }} />
                  </Button>
                  <Typography sx={{ pt: 1 }}>N</Typography>
                  <Button size="medium" variant="contained">
                    <AddIcon sx={{ color: "black" }} />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            {/* quantity sakyo */}
            <Grid container columns={16} sx={{ mt: 6, ml: 4 }}>
              <Grid item xs={8}>
                <Button sx={{ width: "85%", height: 75 }} variant="contained">
                  Buy Now
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button sx={{ width: "85%", height: 75 }} variant="contained" onClick={() => {
                  handleAddCartClose();
                }}>
                  Add to Cart
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Description points Card */}
      <Grid item>
        <Card
          sx={{
            height: 350,
            width: 1560,
            backgroundColor: "white",
            color: "black",
            padding: "30px",
            fontFamily: "Nunito",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            Product Details of {item.item_name}
          </Typography>
          <Grid
            container
            columns={16}
            sx={{ height: 200, backgroundColor: "white" }}
          >
            {/* {item.description.map((desc) => {
              return (
                <Grid item xs={8}>
                  <Typography variant="body1">
                    <CircleIcon sx={{ fontSize: 8, mr: 2 }} />
                    {desc}
                  </Typography>
                </Grid>
              );
            })} */}
            {item.description}
          </Grid>
        </Card>
      </Grid>

      <AddToCartModal item={item} open={openAddCart} handleAddCart={handleAddCartClose} />




    </Grid>
  ) : (
    "loading"
  );
};

export default ItemDetail;

// import { useEffect, useState, useContext } from "react";
// import { ItemsContext } from '../context';
// import { Container, Card, Grid } from '@mui/material';
// import ClothesDetailCarasoul from "./ClothesDetailCarasoul";

// export default function ProductDetails() {
//   const paths = window.location.pathname.split("/");
//   const id = paths[paths.length - 1];
//   const [product, setProduct] = useState(null);
//   const { getById } = useContext(ItemsContext);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const res = await getById(id);
//         setProduct(res);
//         console.log(res.item_name);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     init();
//   }, [])


//   return (
//     <Container>
//       <>
//         <Card>
//           <Grid container>
//             <Grid item>
//               <ClothesDetailCarasoul product={product} />
//             </Grid>
//           </Grid>
//         </Card>
//       </>
//     </Container>

//   )
// }

