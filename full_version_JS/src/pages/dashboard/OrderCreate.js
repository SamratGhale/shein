import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import useSettings from "../../hooks/useSettings";
import {Container} from '@mui/material';
import {useParams, useLocation} from 'react-router-dom';

//components
import Page from '../../components/Page';
import { PATH_DASHBOARD } from "../../routes/paths";
import OrderNewForm from "../../components/_dashboard/e-commerce/order/OrderNewForm";



export default function InvoiceCreate() {
  const {themeStrech} = useSettings();
  const {pathname} = useLocation();
  const isEdit = pathname.includes('edit');
  const {id} = useParams();

  console.log("here");

  return (
    <Page title="Create a new order | Shophalic 24/7">
      <Container maxWidth={themeStrech ? false : 'lg'}>
        <HeaderBreadcrumbs heading={!isEdit ? 'Create a new order' : 'Edit Order'}
        links={[
          {name: 'Dashboard', href: PATH_DASHBOARD.root},
          {name: 'Orders', href: "PATH_DASHBOARD.Orders"},
          {name: !isEdit ? 'New order' : id}
        ]}
        />
          <OrderNewForm isEdit={isEdit} id={id}/>
      </Container> 
    </Page>
  )
}