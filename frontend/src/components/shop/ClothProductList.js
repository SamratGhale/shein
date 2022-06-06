import React from 'react';
import ClothProductCard from "./ClothProductCard";
import {Grid} from "@mui/material"

export default function ClothProductList({cloths}) {
    //console.log(cloths);
    return (
        <Grid container spacing={3}>
            {
                cloths.map((cloth) => {
                    return (
                    <Grid key={cloth._id}  item xs={12} sm={6} md={3}>
                        <ClothProductCard cloth={cloth}/>
                    </Grid>
                    )
                })
            }
        </Grid>
    )
}