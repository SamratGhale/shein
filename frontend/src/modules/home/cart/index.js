/*
* TODO
* checkout
* remove esewa() and put it in services.js
*/

import * as React from "react";
import { Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CLOTHES_IMAGE } from "../../../constants/api";
import Typography from "@mui/material/Typography";
import { ItemsContext } from "../context";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Checkbox } from "@mui/material";
import { PATH_APP } from "../../../routes/paths";

function esewa() {

  var path = "https://uat.esewa.com.np/epay/main";
  var params = {
    amt: 100,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: 100,
    pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
    scd: "EPAYTEST",
    su: "http://localhost:3000/",
    fu: "http://localhost:3000/",
  }

  function post(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in params) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  }

  post(path, params);
}
export default function AlignItemsList() {
  const { cart, addToCart, refreshData, updateCart } = React.useContext(ItemsContext);

  function getAllSelected(){
    const res = cart.filter(c=>c.is_selected == false);
    return res.length === 0;
  }

  async function selectAll(){

    var b= true;
    if(getAllSelected()){
      b = false;
    }
    await Promise.all(cart.map(async (c)=>{
      await updateCart(c._id, {is_selected: b}, false)
    }))
    refreshData();
  }

  function updateSelectedItems(item){
    updateCart(item._id, {is_selected: !item.is_selected})
  }
  const navigate = useNavigate();



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
          {cart.length ? (
            <div>

              <Checkbox checked={getAllSelected()} onChange={selectAll} />
              <Typography variant="body2"> Select all</Typography>
            </div>
          ) : ("")}
          {cart.length
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
                    <Grid item xs={1}>
                      <Checkbox checked={item.is_selected} onChange={()=>updateSelectedItems(item)} />
                    </Grid>
                    <Grid item xs={3}>
                      <Box
                        component="img"
                        sx={{
                          width: 150,
                          m: 3,
                          maxHeight: 150,
                          maxWidth: 150,
                        }}
                        src={`${CLOTHES_IMAGE}${item.item_id}/${item.item[0].files[0]}`}
                      />
                    </Grid>
                    <Grid item sx={{ color: "black" }} xs={9}>
                      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                        {item.item[0].item_name}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        Rs. {item.item[0].item_price * item.quantity}
                      </Typography>
                      <Stack spacing={2} direction="row">
                        <Button disabled={item.quantity == 1} size="small" variant="contained"
                          onClick={() => {
                            addToCart(item.item[0], -1).then(refreshData);
                          }}
                        >
                          <RemoveIcon sx={{ color: "black" }} />
                        </Button>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                          {item.quantity}
                        </Typography>
                        <Button size="small" variant="contained"
                          onClick={() => {
                            console.log("apple");
                            addToCart(item.item[0], 1).then(refreshData);
                          }}
                        >
                          <AddIcon sx={{ color: "black" }} />
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid item xs={1} sx={{ mt: 2 }}>
                      <Button sx={{ color: "black" }}>
                        <DeleteIcon sx={{ ml: 2 }} onClick={async () => {
                        }} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })
            : "Your cart is empty "}
          {cart ? (
            <Grid
              container
              sx={{ alignItems: "center", justifyContent: "center", mt: 3 }}
            >
              <Grid item sx={{ mb: 4, fontFamily: "Nunito" }}>
                <Button variant="contained" onClick={()=>{
                  navigate(PATH_APP.app.checkout);
                }} >Proceed to checkout</Button>
              </Grid>
            </Grid>
          ) : ("")}
        </Grid>
      </Grid>
    </>
  );
}
