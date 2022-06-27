import { CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PATH_APP } from "../../../routes/paths";
import { ItemsContext } from "../context";
import { Grid, Box, Button, Card, ButtonGroup, Modal, Input } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { CLOTHES_IMAGE } from "../../../constants/api";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useSnackbar } from "react-simple-snackbar";
import snakOptions from "../../../constants/snakOptions";
import { OrderContext } from "../../Orders/context";



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

function AddToCartModal({ item, open, handleClose}) {
  const { addToCart } = useContext(ItemsContext);
  const [openSnackbar ] = useSnackbar(snakOptions);
  const [quantity, setQuantity] = useState(0);
  return (
    <Modal
      open={open}
      onClose={handleClose}
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
function AddToOrderModal({ item, open, handleClose }) {
  const {updateCurrOrder} = useContext(OrderContext);
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(0);
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography>Enter amount you wanna purchase</Typography>
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
            item = {...item, cart_quantity : quantity }
            updateCurrOrder([item]);
            navigate(PATH_APP.app.checkout)
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
  const [openAddOrder, setOpenAddOrder] = useState(false);
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
        window.location = PATH_APP.root;
      }
    };
    init();
  }, [getById, id]);

  // const classes = useStyles();

  function handleAddCartClose() {
    setOpenAddCart(!openAddCart);
  }

  function handleAddOrderClose() {
    setOpenAddOrder(!openAddOrder);
  }


  return item ? (
    <>
      <Grid
        container
        sx={{ alignItems: "center", justifyContent: "center", p: 5 }}
        spacing={3}
        columns={16}
      >
        <Grid md={6} item sx={{ backgroundColor: "white" }}>
          <Box sx={{ height: 450, width: 400, maxWidth: 400, maxHeight: 450 }}>
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
                        width: 440,
                        height: 350,
                        maxWidth: 440,
                        maxHeight: 350,
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
        <Grid item md={6} >
          <Card
            sx={{
              backgroundColor: "white",
              color: "black",
              padding: 3,
              fontFamily: "Nunito",
              boxShadow: 20,

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
		            Rs {item.discounted_price}
              </Typography>
              <Typography variant="body1">
                <del>Rs.{item.item_price}</del>
                <Typography sx={{ ml: 1, fontWeight: "bold" }} variant="">
                  -{item.discount}%
                </Typography>
              </Typography>
              {/* quantity sakyo */}
              <Grid container sx={{ mt: 6 }} >
                <Grid item xs={6}>
                  <Button variant="contained" sx={{ width: "80%" }} onClick={() => {
                    handleAddOrderClose();
                  }}>
                    Buy Now
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" sx={{ width: "80%" }} onClick={() => {
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
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "white",
              color: "black",
              fontFamily: "Nunito",
              boxShadow: 20,
              padding: 5
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Product Details of {item.item_name}
            </Typography>
            {item.description}
          </Box>
        </Grid>
      </Grid>
      <AddToCartModal item={item} open={openAddCart} handleClose={handleAddCartClose}  />
      <AddToOrderModal item={item} open={openAddOrder} handleClose={handleAddOrderClose}  />
    </>
  ) : (
    "loading"
  );

};

export default ItemDetail;
