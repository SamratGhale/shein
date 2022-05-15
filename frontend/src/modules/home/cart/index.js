import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { CLOTHES_IMAGE } from '../../../constants/api';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ItemsContext } from '../context';


export default function AlignItemsList() {

    const { cart } = React.useContext(ItemsContext);
    console.log(cart)

    const [data, setData] = React.useState([]);

    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                {cart ? (
                    cart.map((item, i) => {
                        return (
                            <ListItem key={i} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{ width: 56, height: 56 }} variant='square' alt="Remy Sharp" src={`${CLOTHES_IMAGE}${item.item._id}/${item.item.files[0]}`} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.item.item_name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        )
                    })
                ) : " Loading... "}
                <Divider variant="inset" component="li" />
            </List>
            <Button>Checkout</Button>
        </div>
    );
}