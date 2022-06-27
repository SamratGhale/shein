import PropTypes from 'prop-types';
import { MenuItem } from '@mui/material';
// material
import {
  Box,
  Card,
  Stack,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
import { Select } from '@mui/material';
import { getUser } from '../../utils/sessionManager';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  setOrderDetails: PropTypes.func,
  orderDetails: PropTypes.object
};

export default function CheckoutSummary({
  total,
  discount,
  subtotal,
  shipping = null,
  setOrderDetails,
  orderDetails,
  isEdit
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';
  const user = getUser()
  return (
    <div>

      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Billing/Delivery info"
        />

        <CardContent>
          <Stack spacing={2}>
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="body2">
                User
              </Typography>
              <TextField 
              disabled
              value={user.email} 
              variant='standard' type={"email"} />
            </Stack>
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="body2">
                Phone 
              </Typography>
              <TextField 
              value={user.phone} 
              disabled
              variant='standard' 
              type={"text"} />
            </Stack>
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="body2">
                Location
              </Typography>
              <TextField 
              value={orderDetails.location} 
              onChange={(e)=>{
                setOrderDetails({...orderDetails, location : e.target.value})
              }}
              variant='standard' 
              type={"text"} />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Payment Method
              </Typography>
              <Select 
              value={orderDetails.payment_method}
              onChange={(e)=>{
                setOrderDetails({...orderDetails, payment_method : e.target.value})
              }}
               variant='standard'>
                <MenuItem value={'esewa'}>E-sewa</MenuItem>
                <MenuItem value={'cash'}>Cash</MenuItem>
              </Select>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Delivery Type
              </Typography>
              <Select 
              value={orderDetails.delivery_type}
              onChange={(e)=>{
                setOrderDetails({...orderDetails, delivery_type : e.target.value})
              }}
               variant='standard'>
                <MenuItem value={'delivery'}>Delivery</MenuItem>
                <MenuItem value={'self_pickup'}>Self Pickup</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          title="Order Summary"
        />
        <CardContent>
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sub Total
              </Typography>
              <Typography variant="subtitle2">{fCurrency(100)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Discount
              </Typography>
              <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shipping
              </Typography>
              <Typography variant="subtitle2">{shipping ? fCurrency(shipping) : displayShipping}</Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">Total</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                  {fCurrency(total)}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  (VAT included if applicable)
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
