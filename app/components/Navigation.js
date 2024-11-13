import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useData from "../hooks/useData";

const Navigation = () => {
  const navigate = useNavigation();
  const { activeScreen } = useData();
  return (
    <View
      style={{
        width: "100%",

        backgroundColor: "#FFF",
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopWidth: 1,
          borderColor: "#e0e0e0",
          paddingHorizontal: 28,
          paddingVertical: 24,
        }}
      >
        <Pressable onPress={() => navigate.navigate("Home")}>
          <Ionicons
            name="home"
            size={32}
            color={activeScreen == "Home" ? "#007bff" : "#e0e0e0"}
          />
        </Pressable>
        <Pressable onPress={() => navigate.navigate("Notification")}>
          <Ionicons
            name="notifications"
            size={32}
            color={activeScreen == "Notification" ? "#007bff" : "#e0e0e0"}
          />
        </Pressable>
        <Pressable onPress={() => navigate.navigate("Livestock")}>
          <Ionicons
            name="pie-chart"
            size={32}
            color={activeScreen == "Livestock" ? "#007bff" : "#e0e0e0"}
          />
        </Pressable>
        <Pressable onPress={() => navigate.navigate("Profile")}>
          <Ionicons
            name="person"
            size={32}
            color={activeScreen == "Profile" ? "#007bff" : "#e0e0e0"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Navigation;
