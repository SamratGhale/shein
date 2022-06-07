import React, { createContext, useEffect, useReducer } from 'react';
import clothesReduce from '../reducers/Clothes'
import * as Service from '../services/Clothes';
import actions from '../actions/Clothes';

const initialState = {
  clothList : [],
  refresh: false,
};

export const ClothesContext = createContext(initialState);
export const ClothesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clothesReduce, initialState);

  async function refreshData() {
    dispatch({ type: actions.REFRESH_DATA })
  }

  async function getAllClothes() {
    return await Service.getAllClothes();
  }
  async function addCloth(payload) {
    var form = new FormData();
    console.log(payload)
    form.append("item_name", payload.name)
    form.append("item_code", payload.code)
    form.append("item_price", payload.price)
    form.append("discount", payload.discount)
    form.append("quantity", payload.quantity)
    form.append("description", payload.description)

    payload.tags.forEach((t) => {
      form.append("tags", t)
    })

    payload.images.forEach((t) => {
      form.append("images", t)
    })

    const res = await Service.addCloth(form);
    dispatch({ type: actions.REFRESH_DATA })
    return res;
  }

  async function getById(id) {
    try {
      return await Service.getById(id);
    } catch (err) {
      throw err;
    }
  }
  async function updateClothes(id, payload) {
    try {
      var form = new FormData();
      console.log(payload)
      form.append("item_name", payload.name)
      form.append("item_code", payload.code)
      form.append("item_price", payload.price)
      form.append("discount", payload.discount)
      form.append("quantity", payload.quantity)
      form.append("description", payload.description)

      payload.tags.forEach((t) => {
        form.append("tags", t)
      })

      payload.images.forEach((t) => {
        form.append("images", t)
      })

      const res = await Service.updateClothes(id, form);
      dispatch({ type: actions.REFRESH_DATA })
      dispatch({ type: actions.REFRESH_DATA })
    } catch (err) {
      throw err;
    }
  }

  useEffect(async () => {
    if (state.refresh === true) {
      const res = await getAllClothes();
      dispatch({ type: actions.SET_LIST, data : res.data})
      dispatch({ type: actions.REFRESH_DATA })
    }
  }, [state.refresh])
  return (
    <ClothesContext.Provider
      value={{
        clothList: state.clothList,
        getById,
        refreshData,
        addCloth,
        updateClothes
      }}
    >
      {children}
    </ClothesContext.Provider>
 )
}