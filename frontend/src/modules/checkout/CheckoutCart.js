import { sum } from 'lodash';
import { useSnackbar } from 'react-simple-snackbar';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
import snakOptions from "../../constants/snakOptions";
//
import CheckoutSummary from './ChekoutSummary';
import CheckoutProductList from './CheckoutProductList';
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import InvoicePDF from './InvoicePdfModal';
import { OrderContext } from '../Orders/context';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { currOrder,  addOrder} = React.useContext(OrderContext)
  const [ openSnackbar ] = useSnackbar(snakOptions);

  const [orderDetails, setOrderDetails] = useState({
    location: "",
    payment_method: "esewa",
    delivery_type : "delivery",
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
  const totalPrice = sum(currOrder.map((item) => (item.item_price - item.item_price *(item.discount/100)) * item.cart_quantity));

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
        openSnackbar("Order added successfully");
      }).catch(err => {
        openSnackbar(err.response.data.message)
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

            {currOrder.length >= 0 ? (
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
            total={totalPrice}
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
