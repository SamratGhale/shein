import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import {TextField} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MIconButton } from '../../../@material-extend';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  addCart,
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  resetCartCart
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import Scrollbar from '../../../Scrollbar';
import EmptyContent from '../../../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import useClothes from '../../../../hooks/useClothes';
import useOrders from '../../../../hooks/useOrders';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);
  const { cart, total, discount, subtotal } = checkout;
  const isEmptyCart = cart.length === 0;
  const {getByItemCode} = useClothes();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {addOrder, getById, updateOrder} = useOrders();
  const {pathname} = useLocation();

  const isEdit = pathname.includes('edit');
  const {id} = useParams();

  const [orderDetails, setOrderDetails] = useState({
    user_email : "",
    location: "",
    payment_method: "cash",
    delivery_type : "delivery",
    status  : "placed",
    delivery_duedate: new Date(Date.now())
  })

  useEffect(()=>{
    if(isEdit){
      getById(id).then((res)=>{
        setOrderDetails({...orderDetails, 
          user_email : res[0].user_detail[0].email,
          location : res[0].location,
          status : res[0].status,
          delivery_duedate : res[0].delivery_duedate,
          delivery_type : res[0].delivery_type,
          payment_method : res[0].payment_method,
        });
        dispatch(resetCartCart(res[0].item_details))
      });
    }
  },[])

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.cart_quantity));

  //New Item code
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [itemCode, setItemcode] = useState("");

  function handleAdd(){
    getByItemCode(itemCode).then(res=>{
      res.cart_quantity = 1;
      dispatch(addCart(res));
      console.log(res);
      handleClose();
    }).catch(err => {
      enqueueSnackbar(err.response.data.message, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      console.log(err);
    });
  }

  function handleCheckout(){
    if (isEdit) {
      var order = orderDetails; 
      delete order.user_email;
      order = {...order, items: cart}
      console.log(order);
      updateOrder(id, order).then(()=>{
        enqueueSnackbar("Order updated successfully", {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }).catch(err => {
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })

    } else {
      var form_data = new FormData();
      for (var key in orderDetails) {
        form_data.append(key, orderDetails[key]);
      }
      cart.forEach(i => {
        console.log(i);
        form_data.append("items", JSON.stringify({ item_code: i.item_code, quantity: i.cart_quantity }))
      })
      addOrder(form_data).then((res) => {
        enqueueSnackbar("Order added successfully", {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }).catch(err => {
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })

    }
  }


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <div>
                  <Typography variant="h6">
                    Card
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
                    </Typography>
                    <Button variant='contained' onClick={handleOpen}> Add new Item</Button>
                  </Typography>
                  </div>
                }
                sx={{ mb: 3 }}
              />

              {!values.products.length == 0 ? (
                <Scrollbar>
                  <CheckoutProductList
                    formik={formik}
                    onDelete={handleDeleteCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="Cart is empty"
                  description="Look like you have no items in your shopping cart."
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to={PATH_DASHBOARD.eCommerce.root}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Continue Shopping
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={total}
              isEdit={isEdit}
              enableDiscount
              discount={discount}
              subtotal={subtotal}
              setOrderDetails={setOrderDetails}
              orderDetails={orderDetails}
              onApplyDiscount={handleApplyDiscount}
            />
            <Button fullWidth size="large" onClick={handleCheckout} variant="contained" disabled={values.products.length === 0}>
              {isEdit ?  "Update Order" : "Check Out" }
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Enter item code
          </Typography>
          <TextField value={itemCode} onChange={(e)=>setItemcode(e.target.value)}  color="success" focused />
          <Button onClick={handleAdd} variant='contained'>Add</Button>
        </Box>
      </Modal>
    </FormikProvider>
  );
}
