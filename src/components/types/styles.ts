import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#333",
  },
  header: {
    backgroundColor: "#9333ea",
    padding: 30,
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
  content: {
    padding: "0 30px",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#9333ea",
    fontWeight: "bold",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 5,
  },
  section: {
    marginBottom: 15,
    flexDirection: "row",
  },
  sectionFull: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    width: "30%",
    color: "#4b5563",
  },
  text: {
    width: "70%",
  },
  descriptionText: {
    lineHeight: 1.6,
    textAlign: "justify",
  },
  divider: {
    borderBottom: "1px solid #e5e7eb",
    marginVertical: 15,
  },
  footer: {
    marginTop: 30,
    padding: "15px 30px",
    borderTop: "1px solid #e5e7eb",
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  qrCode: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  qrText: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#f3e8ff",
    color: "#9333ea",
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  banner: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: "#f3e8ff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderLeft: "4px solid #9333ea",
  },
  priceTag: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9333ea",
  },
  eventIdBox: {
    backgroundColor: "#f3e8ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderLeft: "4px solid #9333ea",
    alignItems: "center",
  },
  eventIdLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  eventIdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9333ea",
    letterSpacing: 1,
  },
})