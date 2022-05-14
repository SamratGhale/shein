import React, { useContext, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Input } from "@mui/material";

import { Grid } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CLOTHES_IMAGE } from "../../constants/api";

import { ItemsContext } from './context';

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
                <Input value={quantity} onChange={(e)=>{
                    setQuantity(e.target.value);
                }} type="number"/>
                <br></br>
                <Button onClick={()=>{
                addToCart(item, quantity);     
                }}>Add</Button>
            </Box>
        </Modal>
    )
}

function SingleItem({ item, setItem, handleAddCart }) {
    return (
        <Card sx={{ maxWidth: 345, minWidth:300}}>
            <CardActionArea onClick={() => {
                console.log(item)
            }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`${CLOTHES_IMAGE}${item._id}/${item.files[0]}`}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.item_name}
                    </Typography>
                    <Typography variant="subtitle2" color={"purple"} >
                        Rs. {item.item_price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={()=>{
                    setItem(item);
                    handleAddCart();
                }} size="small">Add to cart</Button>
            </CardActions>
        </Card>
    )
}

export default function Home(params) {

    const { refreshData, items } = useContext(ItemsContext);
    const [item, setItem] = useState({});
    const [openAddCart, setOpenAddCart] = useState(false);

    function handleAddCartClose(){
        setOpenAddCart(!openAddCart);
    }

    useEffect(() => {
        refreshData();
    }, [])
    return (
        <Grid container justifyContent="center" columns={16}>
            {items.map((item) => {
                return (
                    <Grid key={item._id} item padding={4}>
                        <SingleItem key={item._id} item={item} setItem={setItem}  handleAddCart={handleAddCartClose}/>
                    </Grid>
                )
            })}
            <AddToCartModal item={item} open={openAddCart} handleClose={handleAddCartClose}/>
        </Grid>
    )
}