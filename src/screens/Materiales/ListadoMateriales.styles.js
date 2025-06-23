import { StyleSheet } from "react-native";

export const styleListMateriales = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 20,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: "#1D4ED8", // azul fuerte
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 40,
  },
});