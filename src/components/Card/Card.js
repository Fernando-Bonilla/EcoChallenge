import { View, Text } from "react-native"; // ✅ importante

const Card = (props) => {
    return (
        <View>
            <Text>
                Nombre: {props.userName},{"\n"}
                Descripción: {props.description},{"\n"}
                Categoría: {props.category},{"\n"}
                Fecha Límite: {props.deadline},{"\n"}
                Puntaje: {props.score}
            </Text>
        </View>
    );
};

export default Card;
