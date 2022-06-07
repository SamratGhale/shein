import React, { createContext, useEffect, useReducer } from 'react';
import * as Service from '../services/Orders';
import actions from "../actions/Orders";
import ordersReduce from '../reducers/Orders';


const initialState = {
  orderList: [],
  refresh: false,
}

export const OrdersContext = createContext(initialState);

export const OrdersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReduce, initialState);

  async function refreshData() {
    dispatch({ type: actions.REFRESH_DATA });
  }


  async function getAllOrders() {
    const res = await Service.getAllOrders();
    return res;
  }

  useEffect(async () => {
    if (state.refresh === true) {
      const res = await getAllOrders();
      dispatch({ type: actions.SET_LIST, data: res.data });
      dispatch({ type: actions.REFRESH_DATA });
    }
  }, [state.refresh])

  return (
    <OrdersContext.Provider
      value={{ orderList: state.orderList, refreshData }}
    >
      {children}
    </OrdersContext.Provider>
  )















}