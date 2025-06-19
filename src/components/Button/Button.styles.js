import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
   button: {
  backgroundColor: "blue", 
  paddingVertical: 10,
  borderRadius: 5,
  minWidth: 200,
  marginBottom: 10,
  borderWidth: 1, // DEBUG
  borderColor: 'red'
}
,

    view: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,  // Para debug
    borderColor: "green"
    },

    text: {
    color: "black",
    fontSize: 20,
    borderWidth: 1,  // Para debug
    borderColor: "yellow"
    }

});

export default styles;