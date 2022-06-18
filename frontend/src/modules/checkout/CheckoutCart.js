import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'react-simple-snackbar';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
//
import CheckoutSummary from './ChekoutSummary';
import CheckoutProductList from './CheckoutProductList';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import InvoicePDF from './InvoicePdfModal';
import { ItemsContext } from '../home/context';
import { OrderContext } from '../Orders/context';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { currOrder, updateCurrOrder, addOrder} = React.useContext(OrderContext)
  const [ enqueueSnackbar, closeSnackbar ] = useSnackbar();

  const [orderDetails, setOrderDetails] = useState({
    location: "",
    payment_method: "cash",
    delivery_type : "delivery",
    status : "placed",
  })


  /** for pdf */
  const [openPdf, setOpenPdf] = useState(false);

  function handleOpenPdf() {
    setOpenPdf(!openPdf);
  }

  /**
   * TODO
   * get the items in the order_items from the context
   */

  useEffect(() => {
  }, [])

  const totalItems = sum(currOrder.map((item) => item.cart_quantity));


  //New Item code
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function handleCheckout() {
      var form_data = new FormData();
      for (var key in orderDetails) {
        form_data.append(key, orderDetails[key]);
      }
      currOrder.forEach(i => {
        console.log(i);
        form_data.append("items", JSON.stringify({ item_code: i.item_code, quantity: i.cart_quantity }))
      })
      addOrder(form_data).then((res) => {
        enqueueSnackbar("Order added successfully", {
          variant: 'success',
          action: (key) => (
            <Button size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </Button>
          )
        });
      }).catch(err => {
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
          action: (key) => (
            <Button size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </Button>
          )
        });
      })
  }


  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title={
                  <Typography variant="h6">
                    Checkout
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
                    </Typography>
                  </Typography>
              }
              sx={{ mb: 3 }}
            />

            {!currOrder.length == 0 ? (
              <CheckoutProductList
                items={currOrder}
              />
            ) : (
              "Please select items to buy"
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary
            total={1000}
            enableDiscount
            discount={10}
            subtotal={9090}
            setOrderDetails={setOrderDetails}
            orderDetails={orderDetails}
          />
          <Button fullWidth size="large" onClick={handleCheckout} variant="contained" disabled={currOrder.length === 0}>
            Complete order
          </Button>
        </Grid>
      </Grid>
      {currOrder.items ? (
        <InvoicePDF invoice={currOrder} open={openPdf} handleOpen={handleOpenPdf} />
      ) : " "}

    </div>
  );
}
