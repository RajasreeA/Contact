import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import GetAppIcon from "@mui/icons-material/GetApp";

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "navy",
    color: "white",
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
  },
  // Additional styles
  page: {
    backgroundColor: "white",
    padding: 20,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
  },
});

function DownloadPdf({ rows }) {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <Text style={styles.header}>Contacts</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Name</Text>
            <Text style={styles.tableCell}>Email</Text>
            <Text style={styles.tableCell}>Phone</Text>
          </View>
          {rows.map((row) => (
            <View key={row.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.name}</Text>
              <Text style={styles.tableCell}>{row.email}</Text>
              <Text style={styles.tableCell}>{row.phone}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>Page 1</Text>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={<MyDocument />} fileName="Contacts.pdf">
      {({ loading }) => (loading ? <GetAppIcon /> : <GetAppIcon />)}
    </PDFDownloadLink>
  );
}

export default DownloadPdf;
