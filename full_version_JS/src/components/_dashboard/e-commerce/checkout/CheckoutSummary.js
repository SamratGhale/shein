import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { MenuItem } from '@mui/material';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { Select } from '@mui/material';
import { DateTimePicker } from '@mui/lab';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  setOrderDetails: PropTypes.func,
  orderDetails: PropTypes.object
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping = null,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
  setOrderDetails,
  orderDetails,
  isEdit
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';

  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>

      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Billing/Delivery info"
          action={
            enableEdit && (
              <Button size="small" type="button" onClick={onEdit} startIcon={<Icon icon={editFill} />}>
                Edit
              </Button>
            )
          }
        />

        <CardContent>
          <Stack spacing={2}>
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="body2">
                User
              </Typography>
              <TextField 
              disabled={isEdit}
              value={orderDetails.user_email} 
              onChange={(e)=>{
                setOrderDetails({...orderDetails, user_email : e.target.value})
              }}
              variant='standard' type={"email"} />
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
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                Order Status
              </Typography>
              <Select 
              value={orderDetails.status}
              onChange={(e)=>{
                setOrderDetails({...orderDetails, status: e.target.value})
              }}
               variant='standard'>
                <MenuItem value={'placed'}>Placed</MenuItem>
                <MenuItem value={'on_delivery'}>On Delivery</MenuItem>
                <MenuItem value={'completed'}>Completed</MenuItem>
                <MenuItem value={'cancled'}>Cancled</MenuItem>
              </Select>
            </Stack>
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="body2">
                Duedate
              </Typography>
              <DateTimePicker
                value={orderDetails.delivery_duedate}
                onChange={(e)=>{
                  setOrderDetails({...orderDetails, delivery_duedate : e})
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          title="Order Summary"
          action={
            enableEdit && (
              <Button size="small" type="button" onClick={onEdit} startIcon={<Icon icon={editFill} />}>
                Edit
              </Button>
            )
          }
        />
        <CardContent>
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sub Total
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
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
