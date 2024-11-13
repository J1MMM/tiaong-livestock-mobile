import { View, Text } from "react-native";
import React, { useCallback } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";

const LivestockScreen = () => {
  const { setActiveScreen } = useData();

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Livestock");
    }, [])
  );
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>LivestockScreen</Text>
    </View>
  );
};

export default LivestockScreen;
