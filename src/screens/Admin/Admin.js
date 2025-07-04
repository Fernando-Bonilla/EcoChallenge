import { KeyboardAvoidingView } from "react-native";
import { ScrollView, View } from "react-native";
import { Text } from "react-native";
import { useUser } from "../../Context/UserContext";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/Card/Card";
import { styleListRetos } from "./Admin.styles";

const Admin = ({ navigation }) => {
    const { user, setUser } = useUser();
    const [retosParaClasificar , setRetosParaClasificar] = useState([]);

    const Logout = () => {
        setUser(null);
        //navigation.navigate("LoginRegister");
    };

    useFocusEffect(
        useCallback(() => {

            const GetParticipations = async () => {
                const data = await AsyncStorage.getItem("participaciones");
                const retos = JSON.parse(data);
                
                const retosPendientes = retos ? retos.filter((r) => r.status === "Pendiente") : [];
                setRetosParaClasificar(retosPendientes);
                console.log("============================")
                console.log("Retos: ", retos);
                console.log("============================")
                console.log("Retos pendientes: ", retosPendientes);
            }            
            
            GetParticipations();
        }, [])
    );

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 20 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>                

                {retosParaClasificar.length > 0 ? (
                    retosParaClasificar.map((reto, index) => (
                        <View key={index} style={styleListRetos.cardWrapper}>

                            {/* <Card
                                userName={reto.userName}
                                description={reto.description}
                                category={reto.category}
                                deadline={reto.deadline}
                                score={reto.score}
                            /> */}
                            <View >
                                <Text>
                                    Nombre: {reto.reto}
                                </Text>
                                <Text>
                                    Usuario: {reto.user}
                                </Text>
                                <Text>
                                    Estado: {reto.status}
                                </Text>

                                <Button
                                    title="Aprobar"
                                    customPress={() => AprobarReto(index)}
                                />
                                <Button
                                    title="Rechazar"
                                    customPress={() => RechazarReto(index)}

                                />

                            </View>
                        </View>
                    ))
                ) : (
                    <Text>
                        "No hay retos para mostrar."
                    </Text>
                )}

                <Button
                    title="Logout"
                    btnColor="#c62100"
                    customPress={Logout}
                />

            </ScrollView>
        </KeyboardAvoidingView>

    );
}

export default Admin;