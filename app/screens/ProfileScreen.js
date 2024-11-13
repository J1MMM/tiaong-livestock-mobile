import { View, Text } from "react-native";
import React, { useCallback } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = () => {
  const { setActiveScreen } = useData();

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Profile");
    }, [])
  );
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
