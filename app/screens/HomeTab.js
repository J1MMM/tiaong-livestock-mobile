import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import useData from "../hooks/useData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const HomeTab = () => {
  const { setActiveScreen } = useData();

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Home");
    }, [])
  );
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>HomeTab</Text>
    </View>
  );
};

export default HomeTab;
