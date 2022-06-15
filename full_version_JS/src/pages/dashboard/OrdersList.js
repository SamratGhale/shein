import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
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

const getFullUser = (params) => {
  let firstName = params.row.user_detail[0].firstName;
  let lastName = params.row.user_detail[0].lastName;
  if(!firstName && !lastName){
    return params.row.user_detail[0].email;
  }
  firstName = firstName? firstName : "";
  lastName = lastName? lastName : "";

  return `${firstName} ${lastName}`
}


// ----------------------------------------------------------------------
const columns = [
  {
    field: 'payment_method',
    headerName: 'Payment Method',
    type: 'string',
    width: 130,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Order Status',
    type: 'string',
    width: 130,
    renderCell:(params)=>{
      var color = ""
      if     (params.value === "placed")color =  "warning";
      else if(params.value === "on_delivery")color =  "info";
      else if(params.value === "completed")color =  "success";
      else if(params.value === "cancled")color =  "error";
      return <Chip variant='outlined' label={params.value} color={color}/>
    },
    editable: false,
  },
  {
    field: 'delivery_type',
    headerName: 'Delievery Type',
    type: 'string',
    width: 140,
    editable: false,
  },
  {
    field: 'username',
    headerName: 'Customer',
    type: 'string',
    valueGetter: getFullUser,
    width: 150,
    editable: false,
  },
  {
    field: 'delivery_duedate',
    headerName: 'Delivery Due Date',
    width: 200,
  },
  {
    field: "click",
    headerName: "Click",
    width: 120,
    renderCell: (params) => {
       // you will find row info in params
      return (<Button
        component={RouterLink}
        to={PATH_DASHBOARD.orders.checkout + `/${params.row._id}/edit`}
        variant='contained'>View Details</Button>)
    }
  }
];

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();
  const { orderList, refreshData } = useOrders();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    refreshData();
  }, [])

  useEffect(() => {
    console.log(orderList);
    if (orderList.length) {
      setOrders(orderList);
    }
  }, [orderList])

  return (
    <Page title="Orders: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Orders List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Orders', href: PATH_DASHBOARD.orders.root},
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.orders.newProduct}
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