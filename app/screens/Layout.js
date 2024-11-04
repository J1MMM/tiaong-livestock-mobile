import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, SafeAreaView } from "react-native";
import HomeScreen from "./HomeScreen";
import Splash from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import useAuth from "../hooks/useAuth";
import ForgotPassScreen from "./ForgotPassScreen";
import VerifyEmailScreen from "./VerifyEmailScreen";

const Stack = createNativeStackNavigator();
const boldFont = require("../../assets/fonts/VAGRoundedStd-Black.otf");
const regularFont = require("../../assets/fonts/VAGRoundedRegular.ttf");

const Layout = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // defining custom fonts
  const [fontsLoaded] = useFonts({
    bold: boldFont,
    regular: regularFont,
  });

  // const useStickyImmersiveReset = (function () {
  //   const visibility = NavigationBar.useVisibility();
  //   useEffect(() => {
  //     if (visibility === "visible") {
  //       NavigationBar.setPositionAsync("absolute");
  //       NavigationBar.setVisibilityAsync("hidden");
  //     }
  //   }, [visibility]);
  // })();

  // display splash screen when font not ready
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  // hide splash screen when font is ready NOTE: It required always at the bottom of all function idk
  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            orientation: "portrait",
            headerShown: false,
            animation: "fade",
            navigationBarHidden: true,
          }}
        >
          {isLoading ? (
            <Stack.Screen name="Splash">
              {() => <Splash setIsLoading={setIsLoading} />}
            </Stack.Screen>
          ) : auth?.accessToken ? (
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          ) : (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          )}

          <Stack.Screen
            name="ForgotPass"
            options={{ animation: "slide_from_right" }}
            component={ForgotPassScreen}
          />
          <Stack.Screen
            name="VerifyEmail"
            options={{ animation: "slide_from_right" }}
            component={VerifyEmailScreen}
          />
        </Stack.Navigator>
        {/* <BgMusic /> */}
        <StatusBar animated translucent />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Layout;
