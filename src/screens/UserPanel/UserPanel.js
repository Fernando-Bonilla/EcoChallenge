import { Text, View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

const UserPanel = ({ navigation }) => {

    const { user } = useUser();
    const [challengePerUser, setChallengePerUser] = useState([]);
    const [finalScore, setFinalScore] = useState(0);

    //Buscamos las participaciones del usuario
    useFocusEffect(
        useCallback(() => {

            const GetParticipations = async () => {
                const data = await AsyncStorage.getItem("participaciones");
                const participaciones = JSON.parse(data);
                //console.log(participaciones);
                const retosDeUsuario = participaciones ? participaciones.filter((p) => p.user === user.email) : [];
                setChallengePerUser(retosDeUsuario);
                //console.log(retosDeUsuario);            
            };

            GetParticipations();

        }, [])
    );

    // Envolviendo la funcion getScore dentro del useEffect y pasarle como dependencia,
    // Se va a ejecutar cada vez que challengePerUser actualize su estado
    useEffect (() => {
        function getScore() {
            let acum = 0;

            console.log("challenges: ", challengePerUser);
            for (let reto of challengePerUser) {
                acum = acum + parseInt(reto.score)
            }

            setFinalScore(acum);
            console.log("acum: ", acum);
        };
        getScore();

    }, [challengePerUser]);


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            <Text>
                Nivel Alcanzado: { }
            </Text>
            <Text>
                Retos Completados: {challengePerUser ? (challengePerUser.length) : 0}
            </Text>
            <Text>
                Puntos Acumulados: {finalScore}
            </Text>
        </ScrollView>

    );

}

export default UserPanel;