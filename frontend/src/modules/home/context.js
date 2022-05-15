import { useLiveQuery } from 'dexie-react-hooks';
import React, { createContext, useEffect, useReducer } from 'react';
import clothesReducer from './reducers';
import { db } from './db';
import * as Service from './services';
import * as actions from './actions';
import { getUser } from '../../utils/sessionManager';

const initialState = {
    items: [],
    cart: [],
    cartCount: 0,
    refresh: false,
    pagination: { limit: 10, start: 0, total: 0, currentPage: 0, totalPages: 0 }
}

export const ItemsContext = createContext(initialState);

export const ItemsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(clothesReducer, initialState);

    function refreshData() {
        dispatch({ type: actions.REGRESH_DATA });
    }
    async function getById(id) {
        return await Service.getById(id);
    }

    useEffect(() => {
        if (state.refresh == true) {
            try {
                Service.getAllItems().then((data) => {
                    dispatch({ type: actions.SET_ITEMS, data: data });
                    dispatch({ type: actions.REGRESH_DATA });
                })
            } catch (err) {
                console.log(err);
            }
        }
    })
    useEffect(() => {
        async function update() {
            const c = await db.cart.count();
            console.log(c)
            dispatch({ type: actions.SET_CART_COUNT, data: c })
        }
        update();
    }, [])

    async function addToCart(item, amount) {

        if (getUser()) {

        } else {
            /* For unlogged users */
            const i = await db.cart.get({ item_id: item._id });
            if (i) {
                const new_q = Number(i.quantity) + Number(amount);
                await db.cart.update(i.id, { quantity: new_q });
            } else {
                await db.cart.add({ item_id: item._id, item, quantity: amount })
                dispatch({ type: actions.SET_CART_COUNT, data: state.cartCount + 1 })
            }
        }
    }
    return (
        <ItemsContext.Provider
            value={{
                items: state.items,
                cartCount: state.cartCount,
                refreshData,
                addToCart,
                getById
            }}
        >
            {children}
        </ItemsContext.Provider>
    )
}
