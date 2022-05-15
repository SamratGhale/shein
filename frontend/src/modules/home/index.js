import React, { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Grid } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CLOTHES_IMAGE } from "../../constants/api";

import { ItemsContext } from './context';

import { ButtonGroup } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddToCartModal({ item, open, handleClose }) {
    const { addToCart } = useContext(ItemsContext);
    const [quantity, setQuantity] = useState(0);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography>Enter the amount to add</Typography>
                <Input value={quantity} onChange={(e) => {
                    setQuantity(e.target.value);
                }} type="number" />
                <br></br>
                <Button onClick={() => {
                    addToCart(item, quantity);
                }}>Add</Button>
            </Box>
        </Modal>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        height: 400,
    },

    media: {
        height: 250
    }
}))


function ProductCard({ item, setItem, handleAddCart }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={`${CLOTHES_IMAGE}${item._id}/${item.files[0]}`} alt="Clothe Image" />
            <CardContent>
                <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            {item.item_name}
                        </Typography>
                        <Typography variant="subtitle2">
                            Rs. {item.item_price}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonGroup>
                            <Button size="small" color="primary" onClick={() => {
                                setItem(item)
                                handleAddCart();
                            }}>
                                Add to Cart
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    )
}






export default function Home(params) {

    const { refreshData, items } = useContext(ItemsContext);
    const [item, setItem] = useState({});
    const [openAddCart, setOpenAddCart] = useState(false);

    function handleAddCartClose() {
        setOpenAddCart(!openAddCart);
    }

    useEffect(() => {
        refreshData();
    }, [])
    return (
        <Box p={5} sx={{ margin: "80px" }}>
            <Grid container spacing={8} sx={{ alignItems: "center", justifyContent: "center" }}>
                {items.map((item) => {
                    return (
                        <Grid key={item._id} item>
                            <ProductCard key={item._id} item={item} setItem={setItem} handleAddCart={handleAddCartClose} />
                        </Grid>
                    )
                })}
                <AddToCartModal item={item} open={openAddCart} handleClose={handleAddCartClose} />
            </Grid>
        </Box>
    )
}