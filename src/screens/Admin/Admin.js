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
    const [retosParaClasificar, setRetosParaClasificar] = useState([]);

    const Logout = () => {
        setUser(null);
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

    const AprobarReto = async (index) => {

        try {

            const RetoActualizado = retosParaClasificar[index];
            //RetoActualizado.status = "Aprobado";

            const data = await AsyncStorage.getItem("participaciones");
            const TodosLosRetos = JSON.parse(data);

            // Modificamos el status del reto que queremos modificar
            for(let i = 0; i < TodosLosRetos.length; i ++) {

                if(TodosLosRetos[i].user === RetoActualizado.user && TodosLosRetos[i].date === RetoActualizado.date){
                    TodosLosRetos[i].status = "Aprobado";
                }
            }

            // Guardamos en el AsyncStorage la lista con el status de ese reto actualizado
            await AsyncStorage.setItem("participaciones", JSON.stringify(TodosLosRetos));

            // Ahora sacamos de la lista local para no mostrarlo mas en el listado de retos a clasificar
            const retosFiltrados = retosParaClasificar.filter((reto, i) => i !== index); // Filtramos, nos traemos aquellos retos del array cuyo index es distinto al que cambiamos
            setRetosParaClasificar(retosFiltrados);

        }catch(error){
            console.error("Error al actualizar el estado del reto", error);
            
        }
        
    }

    const RechazarReto = async (index) => {

        try {

            const RetoActualizado = retosParaClasificar[index];            

            const data = await AsyncStorage.getItem("participaciones");
            const TodosLosRetos = JSON.parse(data);

            // Modificamos el status del reto que queremos modificar
            for(let i = 0; i < TodosLosRetos.length; i ++) {

                if(TodosLosRetos[i].user === RetoActualizado.user && TodosLosRetos[i].date === RetoActualizado.date){
                    TodosLosRetos[i].status = "Rechazado";
                }
            }

            // Guardamos en el AsyncStorage la lista con el status de ese reto actualizado
            await AsyncStorage.setItem("participaciones", JSON.stringify(TodosLosRetos));

            // Ahora sacamos de la lista local para no mostrarlo mas en el listado de retos a clasificar
            const retosFiltrados = retosParaClasificar.filter((reto, i) => i !== index); // Filtramos, nos traemos aquellos retos del array cuyo index es distinto al que cambiamos
            setRetosParaClasificar(retosFiltrados);

        }catch(error){
            console.error("Error al actualizar el estado del reto", error);
            
        }
        
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 20 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>

                {retosParaClasificar.length > 0 ? (
                    retosParaClasificar.map((reto, index) => (
                        <View key={index} style={styleListRetos.cardWrapper}>

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
                                <Text>
                                    Latitud: {reto.location.latitude}
                                </Text>
                                <Text>
                                    Longitud: {reto.location.longitude}
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