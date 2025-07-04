import { Text, View, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

import styles from "./UserPanel.styles";

const UserPanel = ({ navigation }) => {

    const { user } = useUser();
    const [challengePerUser, setChallengePerUser] = useState([]);
    const [finalScore, setFinalScore] = useState(0);
    const [userLvl, setUserLvl] = useState("");


    // Grafica
    const screenWidth = Dimensions.get("window").width;

    const retosLabels = challengePerUser.map(r => r.reto);
    //const puntosData = challengePerUser.map(r => parseInt(r.score));
    const puntosData = challengePerUser.map(r => {
        const score = parseInt(r.score);
        return isNaN(score) ? 0 : score;
    });

    const chartData = {
        labels: retosLabels,
        datasets: [
            {
                data: puntosData,
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,       // barras gris 
        labelColor: (opacity = 1) => `rgba(60, 60, 60, ${opacity})`,   // labels gris 
        style: {
            borderRadius: 8,
        },
        propsForLabels: {
            fontSize: 12,
        }
    };

    //Buscamos las participaciones aprovadas del usuario
    useFocusEffect(
        useCallback(() => {

            const GetParticipations = async () => {
                const data = await AsyncStorage.getItem("participaciones");
                const participaciones = data ? JSON.parse(data) : [];

                //console.log("***** Participaciones por user ****")
                //console.log("Participaciones por user", participaciones);

                const retosDeUsuario = participaciones ? participaciones.filter((p) => p.user === user.email && p.status === "Aprobado") : [];
                //console.log(retosDeUsuario)
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
            //console.log("acum: ", acum);
        };

        getScore();

    }, [challengePerUser]);

    useEffect(() => {

        function getLvl() {
            if (finalScore >= 0 && finalScore <= 5) {
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

            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                    Puntos por Reto
                </Text>
                <BarChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={chartConfig}
                    style={{ borderRadius: 16 }}
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                />
            </View>


        </ScrollView>
    );

}

export default UserPanel;