import React, { useContext, useEffect} from "react";

import {ItemsContext} from './context';

export default function Home(params) {

    const {refreshData}  = useContext(ItemsContext);

    useEffect(()=>{
        refreshData();
    },[])
    return (
        <div>
            This is artha home
        </div>
    )
}