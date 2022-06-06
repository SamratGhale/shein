import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
//
import Label from '../../../Label';
import ColorPreview from '../../../ColorPreview';
import { CLOTHES_IMAGE } from '../../../../_apis_/constants';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { _id, item_name, files , item_price} = product;
  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(_id)}`;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={CLOTHES_IMAGE + '/' + _id + '/'+ files[0] } />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {item_name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {item_price && fCurrency(item_price)}
            </Typography>
            &nbsp;
            {fCurrency(item_price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
