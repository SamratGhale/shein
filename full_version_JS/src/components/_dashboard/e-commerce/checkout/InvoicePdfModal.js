import { useEffect, useState } from "react";
import useOrders from "../../../../hooks/useOrders";
import { Fragment } from "react";
import { Page,Text, Document,View,  Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Modal, Button, Typography, Box } from '@mui/material'

/**
 * TODO
 * create document format (create a function in context)
 * generate pdf
 */
const borderColor = '#90e5fc'
const tableRowsCount = 11;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  description: {
    width: '60%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: '10%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: '15%',
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: '15%'
  },
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  reportTitle: {
    color: '#61dafb',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end'
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 60
  },
  headerContainer: {
    marginTop: 36
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique'
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  total: {
    width: '15%',
    textAlign: 'right',
    paddingRight: 8,
  },
  
  titleContainer:{
    flexDirection: 'row',
    marginTop: 12
},
reportTitle:{
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
}

});

const InvoiceThankYouMsg = () => (
  <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>Thank you for your purchase</Text>
  </View>
);

const InvoiceTableFooter = ({items}) => {
  const total = items.map(item => item.qty * item.rate)
      .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
  return(    
      <View style={styles.row}>
          <Text style={styles.description}>TOTAL</Text>
          <Text style={styles.total}>{ Number.parseFloat(total).toFixed(2)}</Text>
      </View>
  )
};


const InvoiceTableBlankSpace = ({rowsCount}) => {
  const blankRows = Array(rowsCount).fill(0)
  const rows = blankRows.map( (x, i) => 
      <View style={styles.row} key={`BR${i}`}>
          <Text style={styles.description}>-</Text>
          <Text style={styles.qty}>-</Text>
          <Text style={styles.rate}>-</Text>
          <Text style={styles.amount}>-</Text>
      </View>
  )
  return (<Fragment>{rows}</Fragment> )
};

const InvoiceTableRow = ({items, items_details}) => {
  const rows = items.map( (item, i) => 
      <View style={styles.row} key={item._id.toString()}>
          <Text style={styles.description}>{items_details[i].description}</Text>
          <Text style={styles.qty}>{item.quantity}</Text>
          <Text style={styles.rate}>{items_details[i].item_price}</Text>
          <Text style={styles.amount}>{(item.quantity * items_details[i].item_price).toFixed(2)}</Text>
      </View>
  )
  return (<Fragment>{rows}</Fragment> )
};

const InvoiceTableHeader = () => (
  <View style={styles.container}>
      <Text style={styles.description}>Item Description</Text>
      <Text style={styles.qty}>Qty</Text>
      <Text style={styles.rate}>@</Text>
      <Text style={styles.amount}>Amount</Text>
  </View>
);

const InvoiceItemsTable = ({invoice}) => (
  <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={ invoice.items} items_details={invoice.item_details} />
      <InvoiceTableBlankSpace rowsCount={ tableRowsCount - invoice.item_details.length} />
      <InvoiceTableFooter items={invoice.item_details} />
  </View>
);

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <InvoiceTitle title='Invoice' />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);
const InvoiceTitle = ({ title }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.reportTitle}>{title}</Text>
  </View>
);


const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Invoice No:</Text>
      <Text style={styles.invoiceDate}>{invoice._id}</Text>
    </View >
    <View style={styles.invoiceDateContainer}>
      <Text style={styles.label}>Date: </Text>
      <Text >{invoice.created_at}</Text>
    </View >
  </Fragment>
);

const BillTo = ({invoice}) => (
  <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.user_detail[0].company}</Text>
      <Text>{invoice.user_detail[0].address}</Text>
      <Text>{invoice.user_detail[0].phone}</Text>
      <Text>{invoice.user_detail[0].email}</Text>
  </View>
);


const InvoicePdfModal = ({ id, open, handleOpen }) => {
  const [item, setItem] = useState({})
  const { getById } = useOrders();
  useEffect(() => {
    getById(id).then((res) => {
      setItem(res[0]);
      console.log(res[0])
    });
  }, [])

  return (
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fragment>
        <PDFViewer width="1000" height="600" className="app" >
          <Invoice invoice={item} />
        </PDFViewer>
      </Fragment>
    </Modal>
  );

}
export default InvoicePdfModal;