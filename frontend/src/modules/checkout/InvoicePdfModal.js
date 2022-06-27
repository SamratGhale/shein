import { sum } from 'lodash';
import PropTypes from 'prop-types';
import { Modal } from '@mui/material';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../utils/formatNumber';
import { Fragment } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }]
});

const styles = StyleSheet.create({
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase'
  },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    textTransform: 'capitalize'
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    margin: 'auto',
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    borderColor: '#DFE3E8'
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8'
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%' },
  tableCell_2: { width: '50%', paddingRight: 16 },
  tableCell_3: { width: '15%' }
});

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
  invoice: PropTypes.object.isRequired,
  open: PropTypes.bool,
  handleOpen: PropTypes.func
};

export default function InvoicePDF({ invoice, open, handleOpen }) {
  const { _id, items, taxes, status, discount, item_details, user_detail, location } = invoice;
  const subTotal = sum(items.map((item,i) => item_details[i].item_price * item.quantity));
  const total = subTotal ;

  return (
    <Modal
      open={open}
      onClose={handleOpen}
    >
      <Fragment>
        <PDFViewer width="1300" height="600" >
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={[styles.gridContainer, styles.mb40]}>
                <Image source="/static/brand/logo_full.jpg" style={{ height: 32 }} />
                <View style={{ alignItems: 'right', flexDirection: 'column' }}>
                  <Text style={styles.h3}>{status}</Text>
                  <Text>INV-{_id}</Text>
                </View>
              </View>

              <View style={[styles.gridContainer, styles.mb40]}>
                <View style={styles.col6}>
                  <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
                  <Text style={styles.body1}>Shopholic@gmail.com</Text>
                  <Text style={styles.body1}>kathmandu, nepal</Text>
                  <Text style={styles.body1}>9843773217</Text>
                </View>
                <View style={styles.col6}>
                  <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
                  <Text style={styles.body1}>{user_detail[0].email}</Text>
                  <Text style={styles.body1}>{location}</Text>
                  <Text style={styles.body1}>{user_detail[0].phone}</Text>
                </View>
              </View>

              <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCell_1}>
                      <Text style={styles.subtitle2}>#</Text>
                    </View>
                    <View style={styles.tableCell_2}>
                      <Text style={styles.subtitle2}>Description</Text>
                    </View>
                    <View style={styles.tableCell_3}>
                      <Text style={styles.subtitle2}>Qty</Text>
                    </View>
                    <View style={styles.tableCell_3}>
                      <Text style={styles.subtitle2}>Unit price</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={styles.subtitle2}>Total</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableBody}>
                  {items.map((item, i) => (
                    <View style={styles.tableRow} key={item._id}>
                      <View style={styles.tableCell_1}>
                        <Text>{i + 1}</Text>
                      </View>
                      <View style={styles.tableCell_2}>
                        <Text style={styles.subtitle2}>{item.title}</Text>
                        <Text>{item_details[i].description}</Text>
                      </View>
                      <View style={styles.tableCell_3}>
                        <Text>{item.quantity}</Text>
                      </View>
                      <View style={styles.tableCell_3}>
                        <Text>{item_details[0].item_price}</Text>
                      </View>
                      <View style={[styles.tableCell_3, styles.alignRight]}>
                        <Text>{fCurrency(item_details[0].item_price * item.quantity)}</Text>
                      </View>
                    </View>
                  ))}

                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_1} />
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3} />
                    <View style={styles.tableCell_3}>
                      <Text>Subtotal</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text>{fCurrency(subTotal)}</Text>
                    </View>
                  </View>

                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_1} />
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3} />
                    <View style={styles.tableCell_3}>
                      <Text>Discount</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text>{fCurrency(-discount)}</Text>
                    </View>
                  </View>

                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_1} />
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3} />
                    <View style={styles.tableCell_3}>
                      <Text>Taxes</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text>{fCurrency(taxes)}</Text>
                    </View>
                  </View>

                  <View style={[styles.tableRow, styles.noBorder]}>
                    <View style={styles.tableCell_1} />
                    <View style={styles.tableCell_2} />
                    <View style={styles.tableCell_3} />
                    <View style={styles.tableCell_3}>
                      <Text style={styles.h4}>Total</Text>
                    </View>
                    <View style={[styles.tableCell_3, styles.alignRight]}>
                      <Text style={styles.h4}>{fCurrency(total)}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[styles.gridContainer, styles.footer]}>
                <View style={styles.col8}>
                  <Text style={styles.subtitle2}>NOTES</Text>
                  <Text>We appreciate your business. Should you need us to add VAT or extra notes let us know!</Text>
                </View>
                <View style={[styles.col4, styles.alignRight]}>
                  <Text style={styles.subtitle2}>Have a Question?</Text>
                  <Text>support@abcapp.com</Text>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </Fragment>
    </Modal>
  );
}