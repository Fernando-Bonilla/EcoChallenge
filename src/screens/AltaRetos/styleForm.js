
import { StyleSheet } from "react-native";

const stylesForm = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  formWrapper: {
    width: "90%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: "#111827",
    marginBottom: 10,
  },

});

export default stylesForm;
