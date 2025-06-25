import { StyleSheet } from "react-native";

/* const styles = StyleSheet.create({

    text: {

    }

});

export default styles; */

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5', // color suave de fondo
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    value: {
        fontWeight: 'normal',
        color: '#555',
    }
});

export default styles;
