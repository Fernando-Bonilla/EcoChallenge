import React from "react";
import { View, Text } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import Button from "../../components/Button/Button";
import styles from "./Home.styles";
import { useUser } from "../../Context/UserContext";
import Card from "../../components/Card/Card";

const Home = ({ navigation }) => {
  const { user, setUser } = useUser();

  const Logout = () => {
    setUser(null);
    navigation.navigate("LoginRegister");
  };

  return (
    // (user.userName ===! "admin") ?

    <View style={styles.container}>
      {/* Contenedor de botones superiores */}
      <View style={styles.topButtons}>
        <Button
          title="Lista de Retos"
          customPress={() => navigation.navigate("listRetos")}
        />
        <Button
          title="Lista Material"
          customPress={() => navigation.navigate("ListMateriales")}
        />
      </View>

      {/* Contenedor de botones inferiores */}
      <View style={styles.bottomButtons}>
        <Button
          title="Participación a Retos"
          customPress={() => navigation.navigate("Participate")}
        />
        <Button
          title="Estadisticas"
          customPress={() => navigation.navigate("UserPanel")}
        />  
        <Button
          title="Perfil"
          customPress={() => navigation.navigate("Settings")}
        />        
        <Button
          title="Logout"
          btnColor="#c62100"
          customPress={Logout}
        />
      </View>
    </View>
    /* :
    (<KeyboardAvoidingView behavior="padding" style={{ flex: 1, padding: 20 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
            <Card
                userName={reto.userName}
                description={reto.description}
                category={reto.category}
                deadline={reto.deadline}
                score={reto.score}
              />
              <View style={styleListRetos.buttonGroup}>
                <Button
                  title="Aprobar"
                  customPress={() => confirmDelete(index)}
                />
                <Button
                  title="Rechazar"
                  customPress={() =>
                    navigation.navigate("updateRetos", {
                      index: index,
                      retoActual: reto,
                    })
                  }
                />
                </View>
          </ScrollView>
      </KeyboardAvoidingView>) */
  );
};

export default Home;
