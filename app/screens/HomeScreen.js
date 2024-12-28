import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "./HomeTab";
import { useNavigation } from "@react-navigation/native";
import NotificationScreen from "./NotificationScreen";
import LivestockScreen from "./LivestockScreen";
import ProfileScreen from "./ProfileScreen";
import Navigation from "../components/Navigation";
import useData from "../hooks/useData";
const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const navigate = useNavigation();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: "#FFF",
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeTab} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Livestock" component={LivestockScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>

      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
