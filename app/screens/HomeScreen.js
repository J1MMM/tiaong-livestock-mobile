import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "./HomeTab";
import { useNavigation } from "@react-navigation/native";
import NotificationScreen from "./NotificationScreen";
import LivestockScreen from "./LivestockScreen";
import ProfileScreen from "./ProfileScreen";
import Navigation from "../components/Navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Announcement") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "Livestock") {
              iconName = focused ? "paw" : "paw-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007bff",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 70, // Adjust height if needed
            paddingTop: 10,
          },
        })}
        // screenOptions={{
        //   headerShown: false,
        //   animation: "slide_from_right",
        //   contentStyle: {
        //     backgroundColor: "#FFF",
        //   },
        // }}
      >
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Announcement" component={NotificationScreen} />
        <Tab.Screen name="Livestock" component={LivestockScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      {/* <Navigation /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
