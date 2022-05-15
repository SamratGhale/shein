import { CardContent, Typography } from "@mui/material";
import React from "react";
import { useContext, useState, useEffect } from "react";
import { PATH_APP } from "../../../routes/paths";
import { ItemsContext } from "../context";
import { Grid, Box, Button, Card, ButtonGroup, Stack } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { CLOTHES_IMAGE } from "../../../constants/api";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const useStyles = makeStyles((theme) => ({
//   card: {
//     backgroundColor: "#fff",
//   },
// }));

const ItemDetail = (params) => {
  const { getById } = useContext(ItemsContext);
  const paths = window.location.pathname.split("/");
  const id = paths[paths.length - 1];
  const [item, setItem] = useState(null);

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
        console.log(res);
        setItem(res);
      } catch (err) {
        console.log(err);
        window.location = PATH_APP.root;
      }
    };
    init();
  }, []);

  // const classes = useStyles();

  return item ? (
    <Grid container sx={{ mt: 10, ml: 20, mb: 100 }} gap={6}>
      <Grid item>
        <Box item xs={4} sx={{ height: 450, width: 400 }}>
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
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      height: "50%",
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
      <Grid item>
        <Card
          sx={{
            height: 600,
            width: 950,

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
            <Typography variant="h3" sx={{ color: "green" }}>
              Rs.{item.item_price}
            </Typography>
            <Typography variant="body1">
              <del>Rs.{item.item_price}</del>
              <Typography sx={{ ml: 1, fontWeight: "bold" }} variant="">
                -{item.discount}%
              </Typography>
            </Typography>
            //quantity ko lagi
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
            <Grid container gap={2}>
              <Grid item xs={6}>
                <Button>Buy Now</Button>
              </Grid>
              <Grid item xs={6}>
                <Button>Add To Cart</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    "loading"
  );
};

export default ItemDetail;
