import { Icon } from '@iconify/react';
import Label from '../../components/Label';
import { useState, useEffect } from 'react';
import useClothes from '../../hooks/useClothes';
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
  { field: 'item_name', headerName: 'Name', width: 120},
  {
    field: 'item_code',
    headerName: 'Item Code',
    width: 100,
    editable: false,
  },
  {
    field: 'discount',
    headerName: 'Discount %',
    type: 'string',
    width: 130,
    editable: false,
    valueGetter: (params) =>
      `${params.row.discount ?params.row.discount + ' %' : 'None'}`,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 100,
    editable: false,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    type: 'string',
    width: 250,
    editable: false,
    renderCell:(params) =>
      params.row.tags.map((option, index) => (
        <Chip key={option} size="small" label={option} />
      ))
  },
  {
    field: 'vat',
    headerName: 'Vat %',
    description: 'This column has a value getter and is not sortable.',
    valueGetter: (params) =>
      `${params.row.vat ?params.row.vat + ' %' : 'None'}`,
    width: 160,
  },
  {
    field: "click",
    headerName: "Click",
    width: 120,
    renderCell: (params) => {
       // you will find row info in params
      return (<Button
        component={RouterLink}
        to={PATH_DASHBOARD.eCommerce.product+ `/${params.row._id}/edit`}
        variant='contained'>View Details</Button>)
    }
  },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const {clothList, refreshData} = useClothes();
  const [clothes , setClothes] = useState([]);

  useEffect(()=>{
    refreshData();
  },[])
  useEffect(()=>{
    console.log(clothList)
    if(clothList.length){
      setClothes(clothList);
    }
  },[clothList])

  return (
    <Page title="User: List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Clothes list"
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
              Add New Cloth
            </Button>
          }
        />
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            getRowId={(row) => {
              return row._id;
            }}
            density="comfortable"
            rows={clothes}
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
