import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  Stack,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
//
import { Button } from '@mui/material';
import { CLOTHES_IMAGE } from '../../constants/api';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <Button size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Icon icon={minusFill} width={16} height={16} />
        </Button>
        {quantity}
        <Button size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Icon icon={plusFill} width={16} height={16} />
        </Button>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}

ProductList.propTypes = {
  items : PropTypes.array.isRequired,
};

export default function ProductList({ items }) {

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((product) => {
            const { cart_quantity } = product;
            console.log(product)
            var {_id, item_name, item_price, files, discount  } = product;
			item_price = item_price - item_price * (discount/100);
            return (
              <TableRow key={_id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {files ?(
                      <ThumbImgStyle alt="product image" src={CLOTHES_IMAGE +`/${_id}/`+ files[0]} />
                    ):""}
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240, mb: 0.5 }}>
                        {item_name}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        divider={<Divider orientation="vertical" sx={{ height: 14, alignSelf: 'center' }} />}
                      >
                        <Typography variant="body2">
                          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                            size:&nbsp;
                          </Typography>
                          xl
                        </Typography>

                        <Typography variant="body2">
                          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                            color:&nbsp;
                          </Typography>
                          'black'
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(item_price)}</TableCell>
                <TableCell align="left">{cart_quantity}</TableCell>


                <TableCell align="right">{fCurrency(item_price * cart_quantity)}</TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
