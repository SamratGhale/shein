/*
* TODO
* make it better!
* you could dispatch the pagination instead of calling api 
*/

import React, { createContext, useEffect, useReducer } from 'react';
import clothesReducer from './reducers';
import * as Service from './services';
import * as actions from './actions';
import { getUser } from '../../utils/sessionManager';

const initialState = {
    items: [],
    cart: [],
    orderItems: [], /** It seems more simpler to treat orderItems and cart differently, like two independent features of the app*/
    cartCount: 0,
    search: '',
    refresh: false,
    pagination: { limit: 12, start: 0, total: 0, currentPage: 0, totalPages: 0 }
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

    async function setSearch(search) {
        dispatch({ type: actions.SET_SEARCH, data: search });
    }

    async function listItems(query) {
        Service.getAllItems(query).then((data) => {
            dispatch({ type: actions.SET_ITEMS, data: data });
        }).catch(err => {
            throw err;
        })
    }


    useEffect(() => {
        if (getUser()) {
            Service.getMyCart().then((myCarts) => {
                dispatch({ type: actions.SET_CART_DATA, data: myCarts })
                dispatch({ type: actions.SET_CART_COUNT, data: myCarts.length })
            });
        }
    }, [])

    useEffect(() => {
        if (state.refresh === true) {
            try {
                Service.getAllItems().then((data) => {
                    dispatch({ type: actions.SET_ITEMS, data: data });
                })
                if (getUser()) {
                    Service.getMyCart().then((myCarts) => {
                        dispatch({ type: actions.SET_CART_DATA, data: myCarts })
                        dispatch({ type: actions.SET_CART_COUNT, data: myCarts.length })
                    });

                }
                dispatch({ type: actions.REGRESH_DATA });
            } catch (err) {
                console.log(err);
            }
        }
    }, [state.refresh])

    async function addToCart(item, amount) {
        const form = new FormData();
        form.append("item_id", item._id);
        form.append("quantity", amount);
        return await Service.addToCart(form);
    }
    async function deleteFromCart(id) {
        const res = await Service.deleteById(id);
        dispatch({ type: actions.REGRESH_DATA });
		return res;
    }

    async function updateCart(id, data, refresh = true) {
        const res = await Service.updateCart(id, data);
        if (refresh) {
            dispatch({ type: actions.REGRESH_DATA });
        }
        return res;
    }

    return (
        <ItemsContext.Provider
            value={{
                items: state.items,
                cart: state.cart,
                cartCount: state.cartCount,
                pagination: state.pagination,
                refreshData,
                addToCart,
                getById,
                listItems,
                setSearch,
                updateCart,
				deleteFromCart
            }}
        >
            {children}
        </ItemsContext.Provider>
    )
}
