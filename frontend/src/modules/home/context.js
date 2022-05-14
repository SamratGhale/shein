import React, {createContext, useEffect, useReducer} from 'react';
import clothesReducer from './reducers';
import * as Service from './services';
import * as actions from './actions';

const initialState = {
    items  : [],
    cart   : [],
    refresh: false,
    pagination: {limit: 10, start : 0, total: 0, currentPage: 0, totalPages: 0}
}

export const ItemsContext = createContext(initialState);

export const ItemsContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(clothesReducer, initialState);

    function refreshData(){
        dispatch({type: actions.REGRESH_DATA});
    }

    useEffect(()=>{
        if(state.refresh == true){
            try{
                Service.getAllItems().then((data)=>{
                    dispatch({type: actions.SET_ITEMS, data : data});
                    dispatch({type: actions.REGRESH_DATA });
                })
            }catch(err){
                console.log(err);
            }
        }
    })
    return(
        <ItemsContext.Provider
        value={{
            items: state.items,
            refreshData
        }}
        >
            {children}
        </ItemsContext.Provider>
    )
}
