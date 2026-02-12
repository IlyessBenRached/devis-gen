/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";

// Enhanced color palette - elegant olive & gold
const colors = {
  primaryGreen: "#2d5016",
  secondaryGreen: "#8b9a46",
  accentGold: "#c9a961",
  darkOlive: "#3a3a2a",
  lightBg: "#f5f5f0",
  white: "#ffffff",
  grey: "#666666",
  lightGrey: "#e5e7eb",
};

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.35,
    backgroundColor: colors.white,
  },

  // Header Section
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.accentGold,
  },
  logoSection: {
    width: "22%",
  },
  logo: {
    width: 60,
    height: 60,
  },
  companyInfoSection: {
    width: "73%",
    alignItems: "flex-end",
  },
  companyName: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primaryGreen,
    marginBottom: 2,
    letterSpacing: 0.4,
  },
  companySubtitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.secondaryGreen,
    marginBottom: 3,
  },
  companyBanner: {
    backgroundColor: colors.accentGold,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginTop: 2,
  },
  bannerText: {
    fontSize: 8,
    color: colors.darkOlive,
    fontWeight: "bold",
  },

  // Title Section
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  offerTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.primaryGreen,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  dateText: {
    fontSize: 8,
    color: colors.grey,
  },

  // Object Section
  objectSection: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: colors.lightBg,
    borderLeftWidth: 2,
    borderLeftColor: colors.accentGold,
  },
  objectTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.darkOlive,
    marginBottom: 2,
  },
  objectText: {
    fontSize: 8,
    color: colors.grey,
    lineHeight: 1.25,
  },

  // Client Section
  clientSection: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.primaryGreen,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  clientRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  clientLabel: {
    fontWeight: "bold",
    width: 70,
    fontSize: 8,
    color: colors.darkOlive,
  },
  clientValue: {
    fontSize: 8,
    color: colors.grey,
    flex: 1,
  },
  clientInline: {
    fontSize: 8,
    color: colors.grey,
    lineHeight: 1.4,
  },

  // Product Section
  productHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: colors.primaryGreen,
    marginTop: 6,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Table
  table: {
    marginTop: 4,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: colors.primaryGreen,
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGrey,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  tableRowAlt: {
    backgroundColor: colors.lightBg,
  },
  tableCell: {
    fontSize: 8,
    color: colors.darkOlive,
    textAlign: "center",
  },
  tableCellLeft: {
    textAlign: "left",
  },
  tableCellRight: {
    textAlign: "right",
  },

  // Column widths
  colRef: { width: "8%" },
  colDesignation: { width: "35%" },
  colConditionnement: { width: "22%" },
  colContenance: { width: "15%" },
  colPrice: { width: "20%" },

  // Totals
  totalsContainer: {
    marginTop: 8,
    marginBottom: 8,
    paddingTop: 6,
    borderTopWidth: 2,
    borderTopColor: colors.primaryGreen,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    paddingHorizontal: 6,
  },
  totalLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.darkOlive,
  },
  totalValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.primaryGreen,
  },
  grandTotal: {
    fontSize: 10,
    marginTop: 2,
  },

  // Conditions Section
  conditionsContainer: {
    marginTop: 8,
    padding: 6,
    backgroundColor: colors.lightBg,
    borderRadius: 2,
  },
  conditionsTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.primaryGreen,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  conditionRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  conditionLabel: {
    fontSize: 8,
    fontWeight: "bold",
    width: 65,
    color: colors.darkOlive,
  },
  conditionValue: {
    fontSize: 8,
    color: colors.grey,
    flex: 1,
  },

  // Banking Section
  bankingContainer: {
    marginTop: 8,
    padding: 6,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    borderRadius: 2,
  },

  // Footer
  footer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.accentGold,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryGreen,
    padding: 8,
    borderRadius: 3,
  },
  footerLeft: {
    flex: 1,
  },
  footerRight: {
    alignItems: "flex-end",
  },
  footerText: {
    fontSize: 7,
    color: colors.white,
    marginBottom: 1,
    lineHeight: 1.3,
  },
  footerBold: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.accentGold,
    marginBottom: 1,
  },
  footerEmail: {
    fontSize: 7,
    color: colors.accentGold,
    textDecoration: "none",
  },
  companyRegistration: {
    fontSize: 6,
    color: colors.white,
    marginTop: 4,
    textAlign: "center",
  },
});

interface LineItem {
  id: string;
  contenance: string;
  conditionnement: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface DevisData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  items: LineItem[];
  currency: "EUR" | "USD";
  subtotal: number;
  total: number;
  createdAt: Date;
}

const getContenanceLabel = (id: string): string => {
  const labels: Record<string, string> = {
    ml250: "250 ml",
    ml500: "500 ml",
    ml750: "750 ml",
    ml1000: "1L",
    l3: "3L",
    l5: "5L",
    l10: "10L",
    l15: "15L",
    l20: "20L",
  };
  return labels[id] || id;
};

const getConditionnementLabel = (id: string): string => {
  const labels: Record<string, string> = {
    verre: "Bouteille en verre",
    metal: "Bidon Métallique",
  };
  return labels[id] || id;
};

export default function DevisPDF({ devis }: { devis: DevisData }) {
  const date = new Date(devis.createdAt);
  const expiresAt = new Date(date);
  expiresAt.setDate(date.getDate() + 7);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const currencySymbol = devis.currency === "EUR" ? "€" : "$";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.headerContainer}>
          <View style={styles.logoSection}>
            <Image
              src="/logo/logo_carthage_crown_page-0001.jpg"
              style={styles.logo}
            />
          </View>
          <View style={styles.companyInfoSection}>
            <Text style={styles.companyName}>CARTHAGE CROWN OLIVE OIL</Text>
            <Text style={styles.companySubtitle}>
              HUILE D'OLIVE VIERGE EXTRA
            </Text>
            <View style={styles.companyBanner}>
              <Text style={styles.bannerText}>
                Premium Tunisian Extra Virgin Olive Oil
              </Text>
            </View>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.offerTitle}>Offre de Prix</Text>
          <View>
            <Text style={styles.dateText}>Date: {formatDate(date)}</Text>
            <Text style={[styles.dateText, { marginTop: 2 }]}>
              Réf: CCOO-{date.getFullYear()}-
              {String(date.getMonth() + 1).padStart(2, "0")}-
              {String(date.getDate()).padStart(2, "0")}
            </Text>
          </View>
        </View>

        {/* Object Section */}
        <View style={styles.objectSection}>
          <Text style={styles.objectTitle}>
            OBJET : Offre de prix - Huile d'olive Vierge Extra
          </Text>
          <Text style={styles.objectText}>
            Nous avons le plaisir de vous soumettre notre offre EXW comme suit :
          </Text>
        </View>

        {/* Client Information */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionHeader}>INFORMATIONS CLIENT</Text>
          <Text style={styles.clientInline}>
            <Text style={{ fontWeight: "bold" }}>Client: </Text>
            {devis.clientName}
            {devis.clientEmail && (
              <>
                <Text style={{ fontWeight: "bold" }}> | Email: </Text>
                {devis.clientEmail}
              </>
            )}
            {devis.clientPhone && (
              <>
                <Text style={{ fontWeight: "bold" }}> | Tél: </Text>
                {devis.clientPhone}
              </>
            )}
          </Text>
        </View>

        {/* Product Header */}
        <Text style={styles.productHeader}>Huile d'olive Vierge Extra</Text>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colRef]}>Réf.</Text>
            <Text style={[styles.tableHeaderText, styles.colDesignation]}>
              Désignation
            </Text>
            <Text style={[styles.tableHeaderText, styles.colConditionnement]}>
              Conditionnement
            </Text>
            <Text style={[styles.tableHeaderText, styles.colContenance]}>
              Contenance
            </Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>
              Prix unitaire ({devis.currency})
            </Text>
          </View>

          {/* Table Rows */}
          {devis.items.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowAlt : {},
              ]}
            >
              <Text style={[styles.tableCell, styles.colRef]}>{index + 1}</Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellLeft,
                  styles.colDesignation,
                ]}
              >
                Huile d'olive Vierge Extra
              </Text>
              <Text style={[styles.tableCell, styles.colConditionnement]}>
                {getConditionnementLabel(item.conditionnement)}
              </Text>
              <Text style={[styles.tableCell, styles.colContenance]}>
                {getContenanceLabel(item.contenance)}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellRight,
                  styles.colPrice,
                ]}
              >
                {item.unitPrice.toFixed(3)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Sous-total:</Text>
            <Text style={styles.totalValue}>
              {currencySymbol} {devis.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.grandTotal]}>Total:</Text>
            <Text style={[styles.totalValue, styles.grandTotal]}>
              {currencySymbol} {devis.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Shipping Conditions & Banking in Two Columns */}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
          {/* Shipping Conditions */}
          <View style={[styles.conditionsContainer, { flex: 1 }]}>
            <Text style={styles.conditionsTitle}>Conditions d'Expédition</Text>
            <View style={styles.conditionRow}>
              <Text style={styles.conditionLabel}>Origine:</Text>
              <Text style={styles.conditionValue}>Tunisie</Text>
            </View>
            <View style={styles.conditionRow}>
              <Text style={styles.conditionLabel}>Incoterm:</Text>
              <Text style={styles.conditionValue}>EXW Sfax, Tunisie</Text>
            </View>
            <View style={styles.conditionRow}>
              <Text style={styles.conditionLabel}>Validité:</Text>
              <Text style={styles.conditionValue}>
                7 jours à compter du {formatDate(date)}
              </Text>
            </View>
          </View>

          {/* Banking Information */}
          <View style={[styles.bankingContainer, { flex: 1 }]}>
            <Text style={styles.conditionsTitle}>Coordonnées Bancaires</Text>
            <View style={styles.conditionRow}>
              <Text style={styles.conditionLabel}>IBAN:</Text>
              <Text style={styles.conditionValue}>
                TN59 04703048008995308721
              </Text>
            </View>
            <View style={styles.conditionRow}>
              <Text style={styles.conditionLabel}>BIC:</Text>
              <Text style={styles.conditionValue}>BSTUTNTT</Text>
            </View>
            <View style={styles.conditionRow}>
              <Text style={styles.conditionLabel}>Banque:</Text>
              <Text style={styles.conditionValue}>RIB Attijari Bank</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <Text style={styles.footerBold}>
                STE CARTHAGE CROWN OLIVE OIL
              </Text>
              <Text style={styles.footerText}>
                Avenue Habib Bourguiba 3080 Jebeniana - Sfax
              </Text>
              <Text style={styles.footerText}>Tél: +216 26878252</Text>
              <Link
                src="mailto:carthagecrown@gmail.com"
                style={styles.footerEmail}
              >
                carthagecrown@gmail.com
              </Link>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.footerBold}>Carthage Crown</Text>
              <Text style={styles.footerText}>Premium Quality</Text>
              <Text style={styles.footerText}>Extra Virgin Olive Oil</Text>
            </View>
          </View>
          <Text style={styles.companyRegistration}>
            M.F.: 1858707 C/N/M/000 - R.C.: C0870132024
          </Text>
        </View>
      </Page>
    </Document>
  );
}
