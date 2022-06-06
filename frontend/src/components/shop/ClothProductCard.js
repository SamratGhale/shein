import { Box, Card, Link, Typography, Stack, Grid } from '@mui/material';
import { CLOTHES_IMAGE } from '../../constants/api';
import { styled } from "@mui/material/styles";
import {fCurrency} from "../../utils/formatNumber";
import { PATH_APP } from '../../routes/paths';
import {paramCase} from 'change-case';
import {Link as RouterLink} from "react-router-dom";


const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
});

export default function ClothProductCard({ cloth }) {

    const { _id, item_name, files, item_price } = cloth;
    const linkTo = `${PATH_APP.app.items}/${paramCase(_id)}`;

    return (

        <Card>
            <Box sx={{ pt: '100%', position: 'relative' }}>
                <ProductImgStyle
                    alt={cloth.item_name}
                    src={CLOTHES_IMAGE + '/' + _id + '/' + files[0]}
                />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to={linkTo} color="inherit" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {item_name}
                    </Typography>
                </Link>
                <Stack direction="row" alignItems="center" justifyContent="gap-between">
                    <Typography variant="subtitle1">
                        <Typography component="span" variant="body1" sx={{color: 'GrayText.disabled', textDecoration: 'line-through'}}>
                            {item_price && fCurrency(item_price)}
                        </Typography>
                        &nbsp;
                        {fCurrency(item_price)}
                    </Typography>
                </Stack>

            </Stack>
        </Card>
    )
}
