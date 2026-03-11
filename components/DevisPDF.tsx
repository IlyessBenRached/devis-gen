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

const colors = {
  primaryGreen: "#2d5016",
  accentGold: "#c9a961",
  darkOlive: "#3a3a2a",
  white: "#ffffff",
  grey: "#555555",
  lightGrey: "#cccccc",
  black: "#1a1a1a",
};

const s = StyleSheet.create({
  page: {
    padding: 36,
    paddingBottom: 60,
    fontFamily: "Helvetica",
    fontSize: 9,
    lineHeight: 1.4,
    backgroundColor: colors.white,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.accentGold,
  },
  logo: { width: 75, height: 75, marginRight: 16 },
  headerRight: { flex: 1 },
  goldenBanner: {
    backgroundColor: colors.accentGold,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  goldenBannerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.white,
    letterSpacing: 0.5,
  },
  headerMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  invoiceTitle: { fontSize: 12, fontWeight: "bold", color: colors.black },
  invoiceMetaRight: { textAlign: "right" },
  metaText: { fontSize: 8.5, color: colors.grey, lineHeight: 1.5 },

  // CLIENT
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.black,
    textDecoration: "underline",
    marginBottom: 4,
  },
  clientBlock: { marginBottom: 10 },
  clientLine: { fontSize: 8.5, color: colors.black, marginBottom: 2 },
  bold: { fontWeight: "bold" },

  // SUBJECT
  subjectBlock: { marginBottom: 10 },
  subjectText: { fontSize: 8.5, color: colors.black },

  // TABLE
  table: {
    borderWidth: 0.75,
    borderColor: colors.lightGrey,
    marginBottom: 6,
  },
  tRow: {
    flexDirection: "row",
    borderBottomWidth: 0.75,
    borderBottomColor: colors.lightGrey,
  },
  tRowLast: { flexDirection: "row" },
  tCell: {
    fontSize: 8.5,
    color: colors.black,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRightWidth: 0.75,
    borderRightColor: colors.lightGrey,
    justifyContent: "center",
  },
  tCellNoBorder: {
    fontSize: 8.5,
    color: colors.black,
    paddingVertical: 6,
    paddingHorizontal: 4,
    justifyContent: "center",
  },
  tHCell: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderRightWidth: 0.75,
    borderRightColor: colors.lightGrey,
    textAlign: "center",
  },
  tHCellNoBorder: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.black,
    paddingVertical: 5,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  tText: { textAlign: "center", fontSize: 8.5 },

  cRef: { width: "6%" },
  cPack: { width: "17%" },
  cVol: { width: "10%" },
  cQty: { width: "21%" },
  cPrice: { width: "14%" },
  cTotal: { width: "14%" },

  gtLabelCell: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRightWidth: 0.75,
    borderRightColor: colors.lightGrey,
    justifyContent: "center",
  },
  gtLabel: { fontSize: 9, fontWeight: "bold", color: colors.black, textAlign: "center" },
  gtValueCell: {
    width: "28%",
    paddingVertical: 7,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  gtValue: { fontSize: 9, fontWeight: "bold", color: colors.black, textAlign: "right" },

  // FOOTER
  footer: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
  },
  footerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.accentGold,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  footerText: { fontSize: 7.5, color: colors.darkOlive, fontWeight: "bold" },

  // PAGE 2
  p2TotalAmount: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 14,
  },
  p2Section: { marginBottom: 0 },
  p2SectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: colors.black,
    textDecoration: "underline",
    marginBottom: 4,
    marginTop: 10,
  },
  p2Line: { fontSize: 8.5, color: colors.black, marginBottom: 2, lineHeight: 1.5 },
  p2Bold: { fontWeight: "bold" },
  p2Bullet: { flexDirection: "row", marginBottom: 2, paddingLeft: 8 },
  p2BulletDot: { fontSize: 8.5, color: colors.black, marginRight: 5 },
  p2BulletTxt: { fontSize: 8.5, color: colors.black, flex: 1, lineHeight: 1.5 },
  p2Arrow: { fontSize: 8.5, color: colors.black, marginBottom: 2, paddingLeft: 8, fontWeight: "bold" },
  p2Spacer: { marginBottom: 5 },

  stampSection: { marginTop: 24, alignItems: "flex-end" },
  stampBox: {
    width: 140,
    height: 60,
    borderWidth: 1.5,
    borderColor: colors.accentGold,
    borderRadius: 2,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  stampText: { fontSize: 7.5, color: colors.darkOlive, fontWeight: "bold", textAlign: "center", marginBottom: 2 },
  stampSub: { fontSize: 6.5, color: colors.grey, textAlign: "center", lineHeight: 1.4 },
});

// ─── Types ────────────────────────────────────────────────
interface LineItem {
  id: string;
  contenance: string;
  conditionnement: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface DevisData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress?: string;
  items: LineItem[];
  currency: "EUR" | "USD";
  subtotal: number;
  total: number;
  transportFee: number;
  grandTotal: number;
  createdAt: Date;
  invoiceNumber?: string;
  page2Text: string;
}

// ─── Helpers ──────────────────────────────────────────────
const CONTENANCE_LABEL: Record<string, string> = {
  ml250: "250ml", ml500: "500ml", ml750: "750ml", ml1000: "1L",
  l3: "3L", l5: "5L", l10: "10L", l15: "15L", l20: "20L",
};
const COND_LABEL: Record<string, string> = {
  verre: "Glass bottle", metal: "Tin can",
};
const UNITS_PER_PALLET: Record<string, number> = {
  ml250: 2016, ml500: 1248, ml750: 1152, ml1000: 1008,
  l3: 300, l5: 400, l10: 384, l20: 495,
};

const paletteLabel = (contenance: string, qty: number): string => {
  const upp = UNITS_PER_PALLET[contenance];
  if (!upp) return String(qty);
  const p = qty / upp;
  const r = Math.round(p * 2) / 2;
  return `${qty} (${r} Pallet${r !== 1 ? "s" : ""})`;
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });

const fmtNum = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

// ─── Render Page2 text ────────────────────────────────────
function renderPage2(text: string) {
  return text.split("\n").map((raw, i) => {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (trimmed === "") return <Text key={i} style={s.p2Spacer} />;

    if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
      return (
        <View key={i} style={s.p2Bullet}>
          <Text style={s.p2BulletDot}>•</Text>
          <Text style={s.p2BulletTxt}>{trimmed.replace(/^[•\-]\s*/, "")}</Text>
        </View>
      );
    }

    if (trimmed.startsWith("→") || trimmed.startsWith("->")) {
      return <Text key={i} style={s.p2Arrow}>{trimmed}</Text>;
    }

    // ALL CAPS = section title
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 2) {
      return <Text key={i} style={s.p2SectionTitle}>{trimmed}</Text>;
    }

    // Label: value
    if (trimmed.includes(":")) {
      const idx = trimmed.indexOf(":");
      const lbl = trimmed.substring(0, idx + 1);
      const val = trimmed.substring(idx + 1);
      return (
        <Text key={i} style={s.p2Line}>
          <Text style={s.p2Bold}>{lbl}</Text>{val}
        </Text>
      );
    }

    return <Text key={i} style={s.p2Line}>{trimmed}</Text>;
  });
}

// ─── Footer component ─────────────────────────────────────
function Footer() {
  return (
    <View style={s.footer} fixed>
      <View style={s.footerBar}>
        <Text style={s.footerText}>M.F.: 1858707 C/N/M/000 — R.C.: C0870132024</Text>
        <Link src="mailto:france@carthagecrown.com" style={[s.footerText, { textDecoration: "none" }]}>
          france@carthagecrown.com
        </Link>
      </View>
    </View>
  );
}

// ─── Header component ─────────────────────────────────────
function Header({ invoiceNum, date, page }: { invoiceNum: string; date: Date; page: number }) {
  return (
    <View style={s.header}>
      <Image src="/logo/logo_carthage_crown_page-0001.jpg" style={s.logo} />
      <View style={s.headerRight}>
        <View style={s.goldenBanner}>
          <Text style={s.goldenBannerText}>CARTHAGE CROWN OLIVE OIL</Text>
        </View>
        <View style={s.headerMeta}>
          <View>
            {page === 1 ? (
              <>
                <Text style={s.invoiceTitle}>PROFORMA INVOICE N° : {invoiceNum}</Text>
              </>
            ) : (
              <Text style={s.invoiceTitle}>PROFORMA INVOICE</Text>
            )}
          </View>
          <View style={s.invoiceMetaRight}>
            <Text style={s.metaText}>Date: {fmtDate(date)}</Text>
            <Text style={s.metaText}>Page : {page}/2</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Main export ──────────────────────────────────────────
export default function DevisPDF({ devis }: { devis: DevisData }) {
  const date = new Date(devis.createdAt);
  const cSym = devis.currency === "EUR" ? "€" : "$";
  const invoiceNum = devis.invoiceNumber ||
    `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

  return (
    <Document>
      {/* ════ PAGE 1 ════ */}
      <Page size="A4" style={s.page}>
        <Header invoiceNum={invoiceNum} date={date} page={1} />

        {/* CLIENT */}
        <View style={s.clientBlock}>
          <Text style={s.sectionTitle}>CLIENT DETAILS</Text>
          <Text style={s.clientLine}>
            <Text style={s.bold}>Client / Company Name : </Text>{devis.clientName}
          </Text>
          {devis.clientAddress ? (
            <Text style={s.clientLine}><Text style={s.bold}>Address: </Text>{devis.clientAddress}</Text>
          ) : null}
          {devis.clientPhone ? (
            <Text style={s.clientLine}><Text style={s.bold}>Tel: </Text>{devis.clientPhone}</Text>
          ) : null}
          {devis.clientEmail ? (
            <Text style={s.clientLine}><Text style={s.bold}>Email: </Text>{devis.clientEmail}</Text>
          ) : null}
        </View>

        {/* SUBJECT */}
        <View style={s.subjectBlock}>
          <Text style={s.sectionTitle}>SUBJECT :</Text>
          <Text style={s.subjectText}>Price offer - Extra Virgin Olive Oil</Text>
        </View>

        {/* TABLE */}
        <View style={s.table}>
          {/* Header row */}
          <View style={s.tRow}>
            <Text style={[s.tHCell, s.cRef]}>Ref.</Text>
            <Text style={[s.tHCell, s.cPack]}>Packaging</Text>
            <Text style={[s.tHCell, s.cVol]}>Volume</Text>
            <Text style={[s.tHCell, s.cQty]}>Quantity</Text>
            <Text style={[s.tHCell, s.cPrice]}>Unit Price{"\n"}EXW ({cSym})</Text>
            <Text style={[s.tHCellNoBorder, s.cTotal]}>Total ({devis.currency})</Text>
          </View>

          {/* Item rows */}
          {devis.items.map((item, idx) => (
            <View key={item.id} style={s.tRow}>
              <View style={[s.tCell, s.cRef]}><Text style={s.tText}>{idx + 1}</Text></View>
              <View style={[s.tCell, s.cPack]}><Text style={s.tText}>{COND_LABEL[item.conditionnement] || item.conditionnement}</Text></View>
              <View style={[s.tCell, s.cVol]}><Text style={s.tText}>{CONTENANCE_LABEL[item.contenance] || item.contenance}</Text></View>
              <View style={[s.tCell, s.cQty]}><Text style={s.tText}>{paletteLabel(item.contenance, item.quantity)}</Text></View>
              <View style={[s.tCell, s.cPrice]}><Text style={s.tText}>{item.unitPrice.toFixed(3)}</Text></View>
              <View style={[s.tCellNoBorder, s.cTotal]}><Text style={[s.tText, { textAlign: "right" }]}>{fmtNum(item.totalPrice)}</Text></View>
            </View>
          ))}

          {/* Transport fee row */}
          {devis.transportFee > 0 && (
            <View style={s.tRow}>
              <View style={[s.tCell, s.cRef]}><Text style={s.tText}>{devis.items.length + 1}</Text></View>
              <View style={[s.tCell, { flex: 1 }]}><Text style={[s.tText, { textAlign: "left" }]}>Transport fees</Text></View>
              <View style={[s.tCell, s.cPrice]}><Text style={s.tText}>—</Text></View>
              <View style={[s.tCellNoBorder, s.cTotal]}><Text style={[s.tText, { textAlign: "right" }]}>{fmtNum(devis.transportFee)}</Text></View>
            </View>
          )}

          {/* Grand total */}
          <View style={s.tRowLast}>
            <View style={s.gtLabelCell}>
              <Text style={s.gtLabel}>GRAND TOTAL EXW ({devis.currency})</Text>
            </View>
            <View style={s.gtValueCell}>
              <Text style={s.gtValue}>{fmtNum(devis.grandTotal)}</Text>
            </View>
          </View>
        </View>

        <Footer />
      </Page>

      {/* ════ PAGE 2 ════ */}
      <Page size="A4" style={s.page}>
        <Header invoiceNum={invoiceNum} date={date} page={2} />

        <Text style={s.p2TotalAmount}>
          Total Amount: {devis.currency} {fmtNum(devis.grandTotal)}
        </Text>

        <View style={s.p2Section}>
          {renderPage2(devis.page2Text)}
        </View>

        <View style={s.stampSection}>
          <View style={s.stampBox}>
            <Text style={s.stampText}>CARTHAGE CROWN OLIVE OIL</Text>
            <Text style={s.stampSub}>Avenue Habib Bourguiba{"\n"}Jebeniana — Sfax, Tunisia{"\n"}+33 7 59 52 75 90</Text>
          </View>
        </View>

        <Footer />
      </Page>
    </Document>
  );
}