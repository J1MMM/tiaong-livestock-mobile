import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";

const NotificationScreen = () => {
  const { setActiveScreen } = useData();

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Notification");
    }, [])
  );
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>NotificationScreen</Text>
    </View>
  );
};

export default NotificationScreen;
