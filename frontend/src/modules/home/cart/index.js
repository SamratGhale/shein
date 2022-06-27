/*
* TODO
* checkout
* remove esewa() and put it in services.js
*/
import { Modal } from "@mui/material";
import * as React from "react";
import { Button, Box, Stack, Card, CardHeader, CardContent, MenuItem, Select, Divider } from "@mui/material";
import { CLOTHES_IMAGE } from "../../../constants/api";
import Typography from "@mui/material/Typography";
import { ItemsContext } from "../context";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Checkbox } from "@mui/material";
import { PATH_APP } from "../../../routes/paths";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MediaQuery from "react-responsive";
import { OrderContext } from "../../Orders/context";




/**
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

 */
const OrderModal = ({ open, handleOpen, orderDetails, setOrderDetails, closeModal }) => {

  const style = {
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
  };


  return (
    <Modal open={open} onClose={handleOpen} sx={style} >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardHeader
              title="Billing/Delivery info"
            />
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="column" justifyContent="space-between">
                  <Typography variant="body2">
                    Location
                  </Typography>
                  <TextField
                    value={orderDetails.location}
                    onChange={(e) => {
                      setOrderDetails({ ...orderDetails, location: e.target.value })
                    }}
                    variant='standard'
                    type={"text"} />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    Payment Method
                  </Typography>
                  <Select
                    value={orderDetails.payment_method}
                    onChange={(e) => {
                      setOrderDetails({ ...orderDetails, payment_method: e.target.value })
                    }}
                    variant='standard'>
                    <MenuItem value={'esewa'}>E-sewa</MenuItem>
                    <MenuItem value={'cash'}>Cash</MenuItem>
                  </Select>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    Delivery Type
                  </Typography>
                  <Select
                    value={orderDetails.delivery_type}
                    onChange={(e) => {
                      setOrderDetails({ ...orderDetails, delivery_type: e.target.value })
                    }}
                    variant='standard'>
                    <MenuItem value={'delivery'}>Delivery</MenuItem>
                    <MenuItem value={'self_pickup'}>Self Pickup</MenuItem>
                  </Select>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    Order Status
                  </Typography>
                  <Select
                    value={orderDetails.status}
                    onChange={(e) => {
                      setOrderDetails({ ...orderDetails, status: e.target.value })
                    }}
                    variant='standard'>
                    <MenuItem value={'placed'}>Placed</MenuItem>
                    <MenuItem value={'on_delivery'}>On Delivery</MenuItem>
                    <MenuItem value={'completed'}>Completed</MenuItem>
                    <MenuItem value={'cancled'}>Cancled</MenuItem>
                  </Select>
                </Stack>
                <Stack direction="column" justifyContent="space-between">
                  <Typography variant="body2">
                    Duedate
                  </Typography>
                  {/* <DateTimePicker
                value={orderDetails.delivery_duedate}
                onChange={(e) => {
                  setOrderDetails({ ...orderDetails, delivery_duedate: e })
                }}
                renderInput={(params) => <TextField {...params} />}
              /> */}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>



        <Grid item xs={6}>

          <Card>
            <CardHeader
              title="Order Summary"
            />
            <CardContent>
              <Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Sub Total
                  </Typography>
                  <Typography variant="subtitle2"></Typography>
                </Stack>

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1">Total</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" sx={{ color: 'error.main' }}>

                    </Typography>
                    <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                      (VAT included if applicable)
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Button variant="contained">Checkout</Button>
      </Grid>
    </Modal >
  )
}




export default function AlignItemsList() {
  const { cart,  addToCart, refreshData, updateCart, deleteFromCart } = React.useContext(ItemsContext);

  const [modal, setModal] = useState(false);

  const handleChangeModal = () => {
    setModal(!modal);
  }


  const [orderDetails, setOrderDetails] = useState({
    user_email: "",
    location: "",
    payment_method: "cash",
    delivery_type: "delivery",
    status: "placed",
    delivery_duedate: new Date(Date.now())
  })

  useEffect(() => {
    var total = 0;

    cart.forEach((i) => {
      if (i.item && i.item[0] && i.is_selected) {
        total += i.item[0].item_price * i.quantity;
      }
    })

    setOrderDetails(order=> ({...order, total}) )
  }, [cart])



  function getAllSelected() {
    const res = cart.filter(c => c.is_selected === false);
    return res.length === 0;
  }
  const {cartToCurrOrder} = React.useContext(OrderContext);

  async function selectAll() {

    var b = true;
    if (getAllSelected()) {
      b = false;
    }
    await Promise.all(cart.map(async (c) => {
      await updateCart(c._id, { is_selected: b }, false)
    }))
    refreshData();
  }

  function updateSelectedItems(item) {
    updateCart(item._id, { is_selected: !item.is_selected })
  }


  function closeModal() {
    setModal(false);
  }


  return (
    <>

      <MediaQuery minWidth={400}>
        <Typography
          variant="h4"
          sx={{ ml: 15, mt: 5, mb: 5, fontFamily: "Nunito" }}
        >
          Items Added to the Cart
        </Typography>


        <Grid
          container
          gap={2}
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
          spacing={5}
        >

          {cart.length ? (
            <Grid item xs={8}>
              <Checkbox checked={getAllSelected()} onChange={selectAll} />
              <Typography variant="body2"> Select all</Typography>
            </Grid>
          ) : ("")}


          <Grid item container direction="column" xs={8} spacing={5}>
            {cart.length
              ? cart.map((item, i) => {
							console.log(item)
                return (
                  <Grid item key={i}>
                    <Grid
                      container
                      direction="row"
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "30px",
                        border: 1,
                        alignItems: "center",
                        padding: 1
                      }}

                    >
                      <Grid item xs>
                        <Checkbox checked={item.is_selected} onChange={() => updateSelectedItems(item)} />
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          component="img"
                          sx={{
                            width: 100,
                            maxHeight: 100,
                            height: 100,
                            maxWidth: 100,
                          }}
                          src={`${CLOTHES_IMAGE}${item.item_id}/${item.item[0].files[0]}`}
                        />
                      </Grid>
                      <Grid container item sx={{ color: "black", alignItems: "center", justifyContent: "center" }} xs={5}>
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            {item.item[0].item_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" >
                            Rs. {item.item[0].item_price * item.quantity}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={2} direction="row">
                            <Button disabled={item.quantity === 1} size="small"
                              onClick={() => {
                                addToCart(item.item[0], -1).then(refreshData);
                              }}
                            >
                              <RemoveIcon sx={{ color: "black" }} />
                            </Button>
                            <Typography variant="body1" >
                              {item.quantity}
                            </Typography>
                            <Button size="small"
                              onClick={() => {
                                console.log("apple");
                                addToCart(item.item[0], 1).then(refreshData);
                              }}
                            >
                              <AddIcon sx={{ color: "black" }} />
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Button sx={{ color: "black" }}>
                          <DeleteIcon onClick={async () => {
							deleteFromCart(item._id);	
                          }} />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
              : "Your cart is empty "}
          </Grid>


          {
            cart ? (
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ alignItems: "center", justifyContent: "center", mt: 3 }}
                >
                  <Grid item sx={{ mb: 4, fontFamily: "Nunito" }}>
                    <Button variant="contained" onClick={() => {
					  cartToCurrOrder();
                      window.location = PATH_APP.app.checkout
                    }} >Proceed to checkout</Button>
                  </Grid>
                </Grid>
              </Grid>
            ) : ("")
          }
          <OrderModal open={modal} handleOpen={handleChangeModal} orderDetails={orderDetails} setOrderDetails={setOrderDetails} closeModal={closeModal} />
        </Grid>
      </MediaQuery>





      {/* //For Mobile */}
      <MediaQuery maxWidth={400}>
        <Typography
          variant="h4"
          sx={{ p: 3, fontFamily: "Nunito" }}
        >
          Items Added to the Cart
        </Typography>


        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "center"
          }}
          gap={3}
        >

          {cart.length ? (
            <Grid item xs={8}>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Checkbox checked={getAllSelected()} onChange={selectAll} />
                <Typography variant="body2"> Select all</Typography>
              </Stack>
            </Grid>
          ) : ("")}

          <Grid item container direction="column" xs={8} spacing={5}>
            {cart.length
              ? cart.map((item, i) => {
							console.log(item)
                return (
                  <Grid item key={i}>
                    <Grid
                      container
                      direction="column"
                      gap={3}
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "30px",
                        border: 1,
                        alignItems: "center",
                        padding: 1
                      }}

                    >
                      <Grid item xs={1}>
                        <Checkbox checked={item.is_selected} onChange={() => updateSelectedItems(item)} />
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          component="img"
                          sx={{
                            width: 100,
                            maxHeight: 100,
                            height: 100,
                            maxWidth: 100,
                          }}
                          src={`${CLOTHES_IMAGE}${item.item_id}/${item.item[0].files[0]}`}
                        />
                      </Grid>
                      <Grid container sx={{ color: "black", alignItems: "center", justifyContent: "center", width: "100%" }} spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            {item.item[0].item_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" >
                            Rs. {item.item[0].item_price * item.quantity}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Stack direction="row">
                            <Button disabled={item.quantity === 1} size="small"
                              onClick={() => {
                                addToCart(item.item[0], -1).then(refreshData);
                              }}
                            >
                              <RemoveIcon sx={{ color: "black" }} />
                            </Button>
                            <Typography variant="body1" >
                              {item.quantity}
                            </Typography>
                            <Button size="small"
                              onClick={() => {
                                addToCart(item.item[0], 1).then(refreshData);
                              }}
                            >
                              <AddIcon sx={{ color: "black" }} />
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Button sx={{ color: "black" }} onClick={()=>{
							deleteFromCart(item._id);	
						}}>
                          <DeleteIcon/>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })
              : "Your cart is empty "}
          </Grid>
          {
            cart ? (
              <Grid item xs={12}>
                <Grid
                  container
                  sx={{ alignItems: "center", justifyContent: "center", mt: 3 }}
                >
                  <Grid item sx={{ mb: 4, fontFamily: "Nunito" }}>
                    <Button variant="contained" onClick={() => {
                      window.location = PATH_APP.app.checkout
                    }} >Proceed to checkout</Button>
                  </Grid>
                </Grid>
              </Grid>
            ) : ("")
          }
          <OrderModal open={modal} handleOpen={handleChangeModal} orderDetails={orderDetails} setOrderDetails={setOrderDetails} closeModal={closeModal} />
        </Grid>
      </MediaQuery>
    </>
  )
}
