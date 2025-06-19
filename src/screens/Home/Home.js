import React from "react";
import { View, Text } from "react-native";
import AsyncStorageInspector from "../../components/AsyncStorageInspector";

export const Home = (navigation) => {

    return (
        <View style={{ flex: 1 }}>
            <Text>
                Home Screen
            </Text>
            <AsyncStorageInspector />
        </View>
        
    );

}