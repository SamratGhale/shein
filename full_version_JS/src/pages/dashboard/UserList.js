import { Icon } from '@iconify/react';
import Label from '../../components/Label';
import { useState, useEffect } from 'react';
import useUsers from '../../hooks/useUsers'
import plusFill from '@iconify/icons-eva/plus-fill';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
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
  { field: 'phone', headerName: 'Phone', width: 130},
  {
    field: 'email',
    headerName: 'Email',
    type: 'number',
    width: 200,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    type: 'string',
    width: 130,
    editable: false,
  },
  {
    field: 'is_registered',
    headerName: 'Is Registered?',
    type: 'boolean',
    width: 100,
    editable: false,
    renderCell: (params) => {
      return (
        <Label
          color={
            (!params.value && 'error') ||
            (params.value && 'success')
          }
        >
          {params.value ? "Yes" : "No"}
        </Label>
      )
    }
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: "click",
    headerName: "Click",
    width: 120,
    renderCell: (params) => {
       // you will find row info in params
      return (<Button
        component={RouterLink}
        to={PATH_DASHBOARD.user.root + `/${params.row._id}/edit`}
        variant='contained'>View Details</Button>)
    }
  },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const {list, refreshData} = useUsers();
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    refreshData()
  },[])
  useEffect(()=>{
    console.log(list)
    if(list.length){
      setUsers(list);
    }
  },[list])

  return (
    <Page title="User: List | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.newUser}
              startIcon={<Icon icon={plusFill} />}
            >
              New User
            </Button>
          }
        />
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            getRowId={(row) => {
              return row._id;
            }}
            density="comfortable"
            rows={users}
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
