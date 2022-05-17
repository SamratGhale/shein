import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Pagination } from "@mui/material";
import { Modal, Stack } from "@mui/material";
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
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

import { ItemsContext } from "./context";

import { ButtonGroup } from "@mui/material";

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

//Product ko modal

const modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 600,
  maxHeight: 600,
  maxWidth: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 15,
  boxShadow: 24,
  p: 4,
};

function ProductModal({ item, open, handleClose }) {
  console.log(item);
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

  return item ? (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1350,
          height: 550,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 15,
        }}
        gap={4}
        columns={16}
        direction="row"
      >
        <Grid item xs={6}>
          {/* Swipeable vies bascha */}
          <Box sx={{ padding: 2, height: 340, width: 450, mt: 4 }}>
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
                        width: 410,
                        height: 330,
                        // maxWidth: 330,
                        // maxHeight: 350,
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
        <Grid item xs={8}>
          <Typography sx={{ fontFamily: "Nunito", mb: 4 }} variant="h4">
            {item.item_name}
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 5 }}>
            Tags:
            {item.tags.map((tag) => {
              return (
                <ButtonGroup size="small" variant="contained">
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
          <Typography
            sx={{ fontFamily: "Nunito", color: "green" }}
            variant="h4"
          >
            Rs. {item.item_price}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            <del>Rs.{item.item_price}</del> -{item.discount}%
          </Typography>
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
          <Grid container columns={16} sx={{ mt: 6 }}>
            <Grid item xs={8}>
              <Button sx={{ width: "85%", height: 75 }} variant="contained">
                Buy Now
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Button sx={{ width: "85%", height: 75 }} variant="contained">
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <CloseIcon sx={{ ml: 6 }} />
        </Grid>
      </Grid>
    </Modal>
  ) : (
    "loading"
  );
}

//..
export default function Home() {
  const { refreshData, items, pagination, listItems } =
    useContext(ItemsContext);
  const [item, setItem] = useState({});
  const [current, setCurrent] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [openAddCart, setOpenAddCart] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);

  useEffect(() => {
    handlePagination(1);
  }, []);

  const handlePagination = (current_page) => {
    let _start = (current_page - 1) * pagination.limit;
    setCurrent(current_page);
    let query = { name: searchText };

    return loadItemsList({
      start: _start,
      limit: pagination.limit,
      ...query,
    });
  };

  const loadItemsList = (query) => {
    if (!query) query = null;
    listItems(query)
      .then()
      .catch(() => {
        console.log("error");
      });
  };

  function handleAddCartClose() {
    setOpenAddCart(!openAddCart);
  }

  // for toggling product modal
  function handleProductModalClose() {
    setOpenProductModal(!openProductModal);
  }

  useEffect(() => {
    refreshData();
    console.log(items);
  }, []);

  return (
    <div>
      <Box p={5} sx={{ margin: "80px" }}>
        <Grid
          container
          spacing={8}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          {items
            ? items.map((item) => {
                return (
                  <Grid key={item._id} item>
                    <ProductCard
                      key={item._id}
                      item={item}
                      setItem={setItem}
                      handleAddCart={handleAddCartClose}
                      handleProductModal={handleProductModalClose}
                    />
                  </Grid>
                );
              })
            : ""}

          <AddToCartModal
            item={item}
            open={openAddCart}
            handleClose={handleAddCartClose}
          />
          {item.item_name ? (
            <ProductModal
              item={item}
              open={openProductModal}
              handleClose={handleProductModalClose}
            />
          ) : (
            ""
          )}
        </Grid>
      </Box>
      <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
        <Grid item>
          <Pagination
            count={10}
            page={current}
            onChange={(e, v) => {
              handlePagination(v);
            }}
            shape="rounded"
          />
        </Grid>
      </Grid>
    </div>
  );
}
