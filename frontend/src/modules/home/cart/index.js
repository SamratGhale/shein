import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Button, Box, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { CLOTHES_IMAGE } from "../../../constants/api";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ItemsContext } from "../context";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

import RemoveIcon from "@mui/icons-material/Remove";

export default function AlignItemsList() {
  const { cart } = React.useContext(ItemsContext);
  console.log(cart);

  const [data, setData] = React.useState([]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{ ml: 15, mt: 5, mb: 5, fontFamily: "Nunito" }}
      >
        Items Added to the Cart
      </Typography>
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          gap={2}
          sx={{
            width: 1260,
            maxheight: 1200,
            padding: 10,
          }}
        >
          {cart
            ? cart.map((item, i) => {
                return (
                  <Grid item key={i}>
                    <Grid
                      container
                      columns={16}
                      sx={{
                        width: 1100,
                        height: 200,
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "30px",
                      }}
                      gap={3}
                    >
                      <Grid item xs={3} sx={{ ml: 2 }}>
                        <Box
                          component="img"
                          sx={{
                            width: 150,
                            m: 3,
                            maxHeight: 150,
                            maxWidth: 150,
                          }}
                          src={`${CLOTHES_IMAGE}${item.item._id}/${item.item.files[0]}`}
                        />
                      </Grid>
                      <Grid item sx={{ color: "black" }} xs={11}>
                        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
                          {item.item.item_name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          Rs. {item.item.item_price}
                        </Typography>
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
                      <Grid item xs={1} sx={{ mt: 2 }}>
                        <DeleteIcon sx={{ ml: 2 }} />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
            : " Loading... "}
        </Grid>
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: "center", mt: 3 }}
        >
          <Grid item sx={{ mb: 4, fontFamily: "Nunito" }}>
            <Button variant="contained">Checkout</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
