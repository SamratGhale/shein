/**
 * TODO
 * orders: my_orders
 * currOrder: current order state
 * refresh
 */

import { createContext } from "react"
import ordersReducer from './reducers';
import * as actions from './actions';
import * as Service from './services';
import { useReducer } from "react";

const initialState = {
  orders: [],
  currOrder: [],
  refresh: false
}

export const OrderContext = createContext(initialState);

export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  function refreshData() {
    dispatch({ type: actions.REFRESH_DATA });
  }
  /*
  async function getById(id) {
    return await Service.getById(id);
  }
  */

  /** Each items have cart_quantity in them else set to 1 */
  function updateCurrOrder(items) {
    dispatch({ type: actions.SET_CURR_ORDER, data: items })
  }
  async function addOrder(data) {
    const form = new FormData();
    form.append("payment_method", data.payment_method);
    form.append("delivery_type", data.delivery_type);
    form.append("location", data.location);

    /* 
    * TODO
    * to change this for order items directly
    */
    const items = state.cart.filter((i) => i.is_selected == true);

    items.forEach((i) => {
      form.append("items", JSON.stringify(i));
    })

    return await Service.addOrder(form);
  }

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        currOrder: state.currOrder,
        refreshData,
        updateCurrOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

