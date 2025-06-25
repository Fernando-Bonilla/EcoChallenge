import { Text, View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import styles from "./UserPanel.styles";

const UserPanel = ({ navigation }) => {

    const { user } = useUser();
    const [challengePerUser, setChallengePerUser] = useState([]);
    const [finalScore, setFinalScore] = useState(0);
    const [userLvl, setUserLvl] = useState("");

    //Buscamos las participaciones del usuario
    useFocusEffect(
        useCallback(() => {

            const GetParticipations = async () => {
                const data = await AsyncStorage.getItem("participaciones");
                const participaciones = JSON.parse(data);

                const retosDeUsuario = participaciones ? participaciones.filter((p) => p.user === user.email) : [];
                setChallengePerUser(retosDeUsuario);

            };

            GetParticipations();

        }, [])
    );

    // Envolviendo la funcion getScore dentro del useEffect y pasarle como dependencia,
    // Se va a ejecutar cada vez que challengePerUser actualize su estado
    useEffect(() => {
        function getScore() {
            let acum = 0;

            for (let reto of challengePerUser) {
                acum += parseInt(reto.score)
            }

            setFinalScore(acum);
            console.log("acum: ", acum);
        };

        getScore();

    }, [challengePerUser]);

    useEffect(() => {

        function getLvl() {
            if (finalScore >= 0 || finalScore <= 5) {
                setUserLvl("Principiante");


            } else if (finalScore > 5 && finalScore <= 15) {
                setUserLvl("Avanzado");


            } else {
                setUserLvl("Sarpado en Reciclaje");
            }
        }

        getLvl();

    }, [finalScore]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Nivel Alcanzado: <Text style={styles.value}>{userLvl}</Text>
            </Text>
            <Text style={styles.title}>
                Retos Completados: <Text style={styles.value}>{challengePerUser.length}</Text>
            </Text>
            <Text style={styles.title}>
                Puntos Acumulados: <Text style={styles.value}>{finalScore}</Text>
            </Text>
        </ScrollView>
    );


    /* return (
        
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            
            <Text>
                Nivel Alcanzado: {userLvl}
            </Text>
            <Text>
                Retos Completados: {challengePerUser ? (challengePerUser.length) : 0}
            </Text>
            <Text>
                Puntos Acumulados: {finalScore}
            </Text>
        </ScrollView>

    ); */

}

export default UserPanel;