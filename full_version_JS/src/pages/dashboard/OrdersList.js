import { Icon } from '@iconify/react';
import Label from '../../components/Label';
import { useState, useEffect } from 'react';
import useClothes from '../../hooks/useClothes';
import useOrders from '../../hooks/useOrders';
import plusFill from '@iconify/icons-eva/plus-fill';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Chip,
  Button,
  Container,
} from '@mui/material';
// redux
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------
const columns = [
  { field: 'username', headerName: 'User Name', width: 120 },
  {
    field: 'payment_method',
    headerName: 'Payment Method',
    type: 'string',
    width: 100,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Order Status',
    type: 'string',
    width: 130,
    editable: false,
  },
  {
    field: 'delivery_type',
    headerName: 'Delievery Type',
    type: 'string',
    width: 100,
    editable: false,
  },
  {
    field: 'location',
    headerName: 'Delievery Address',
    type: 'string',
    width: 250,
    editable: false,
  },
  {
    field: 'delivery_charge',
    type: "string",
    headerName: 'Delievery Charge',
    width: 160,
  },
  {
    field: 'delivery_duedate',
    headerName: 'Delivery Charge',
    width: 160,
  }
];

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const {orderList, refreshData} = useOrders();
  const [orders , setOrders] = useState([]);

  useEffect(()=>{
    refreshData();
  },[])

  useEffect(()=>{
    console.log(orderList);
    if(orderList.length){
      setOrders(orderList);
    }  
  },[orderList])


 console.log(orders);
 
 

  return (
    <Page title="User: List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Orders List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.eCommerce.newProduct}
              startIcon={<Icon icon={plusFill} />}
            >
              Add New Order
            </Button>
          }
        />
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            getRowId={(row) => {
              return row._id;
            }}
            density="comfortable"
            rows={orders}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </div>

      </Container>
    </Page>
  );
}
