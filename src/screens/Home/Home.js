import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button/Button";
import styles from "./Home.styles";
import { useUser } from "../../Context/UserContext";

const Home = ({ navigation }) => {
  const { user, setUser } = useUser();

  const Logout = () => {
    setUser(null);
    navigation.navigate("LoginRegister");
  };

  return (
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
  );
};

export default Home;
