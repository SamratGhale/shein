/**
 * TODO
 * orders: my_orders
 * currOrder: current order state
 * refresh
 */

import { createContext, useContext, useEffect } from "react"
import ordersReducer from './reducers';
import * as actions from './actions';
import * as Service from './services';
import { useReducer } from "react";
import { deleteCurrOrder, getCurrOrder, saveCurrOrders } from "../../utils/sessionManager";
import { ItemsContext } from "../home/context";

const initialState = {
	orders: [],
	currOrder: [],
	refresh: false
}

export const OrderContext = createContext(initialState);

export const OrderContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ordersReducer, initialState);
	const {updateCart, cart} = useContext(ItemsContext);

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
		saveCurrOrders(items);
		dispatch({ type: actions.SET_CURR_ORDER, data: items })
	}

	useEffect(() => {
		const old_order = getCurrOrder();
		if(old_order){
			dispatch({ type: actions.SET_CURR_ORDER, data:JSON.parse(old_order)})
		}
	}, [])

	async function addOrder(data) {
		try{
			const res = await Service.addOrder(data);
			dispatch({ type: actions.SET_CURR_ORDER, data:[]})
			deleteCurrOrder();
			return res;
		}catch(err){
			throw err;
		}
	}
	async function getMyOrders(data) {
		try{
			const res = await Service.getMyOrder();
			return res.data;
		}catch(err){
			throw err;
		}
	}
	
	useEffect(()=>{
		if(state.refresh){
			getMyOrders().then((res)=>{
				dispatch({type : actions.SET_ORDERS, data: res })
				dispatch({type : actions.REFRESH_DATA})
			}).catch(err=>{
				throw err;
			})
		}
	},[state.refresh])

	function cartToCurrOrder(data) {
		const items = cart.filter(i=>i.is_selected === true)
		.map((i)=>{
			return {...i.item[0], cart_quantity: i.quantity }
		});
		const remaining = cart.filter(i=>i.is_selected === false);
		updateCart(remaining);
		updateCurrOrder(items);
	}

	return (
		<OrderContext.Provider
			value={{
				orders: state.orders,
				currOrder: state.currOrder,
				refreshData,
				updateCurrOrder,
				addOrder,
				cartToCurrOrder,
				getMyOrders
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

