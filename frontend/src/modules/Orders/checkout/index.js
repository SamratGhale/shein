/* 
* TODO
* For now the checkout page just takes out itesm that are selected in the cart
* Add feature to checkout a single item directly (BUY NOW feature)
*/

/* 
* TODO
* UI - Show to items, 
* Only those with is_selected true
*/

/*Imports*/
import { Button, Typography } from "@mui/material";
import { ItemsContext } from "../../home/context";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { PAYMENT_METHODS, PLACEMENT } from "../../../constants/order";
import { useSnackbar } from "react-simple-snackbar";
import snakOptions from "../../../constants/snakOptions";
import { TextField, Grid, Stack, Box, Modal } from "@mui/material";



const Checkout = () => {

  const [openSnackbar, closeSnackbar] = useSnackbar(snakOptions);
  const { cart, addOrder } = useContext(ItemsContext);
  const [orderInfo, setOrderInfo] = useState({
    total: 0,
    subTotal: 0,
    payment_method: PAYMENT_METHODS.CASH,
    delivery_type: PLACEMENT.DELIVERY,
    location: ""
  });

  /* Calculate total price and other details */

  /*
  * TODO
  * calculate discount and vat's
  * proably should do it in a backend (atleast calculating total of single item)
  */

  useEffect(() => {
    var total = 0;

    cart.map((i) => {
      if (i.item && i.item[0] && i.is_selected) {
        total += i.item[0].item_price * i.quantity;
      }
    })

    setOrderInfo({ ...orderInfo, total })
  }, [cart])

  const handleSubmit = async () => {

    try {
      const res = await addOrder(orderInfo);
      console.log(res);
      openSnackbar(`Order completely successfully`);
    } catch (err) {
      console.log(err);
      openSnackbar(`Order unsuccessful`);
    }
  }



  const [modal, setModal] = useState(false);



}
export default Checkout;