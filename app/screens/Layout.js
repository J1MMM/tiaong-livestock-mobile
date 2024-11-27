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
import PersonalInfoFrom3 from "./PersonalInfoFrom3";
import PersonalInfoFrom2 from "./PersonalInfoForm2";
import PersonalInfoFrom1 from "./PersonalInfoFrom1";
import FarmProfileForm1 from "./FarmProfileForm1";
import FarmProfileForm2 from "./FarmProfileForm2";
import FarmProfileForm3 from "./FarmProfileForm3";
import ReviewForm from "./ReviewForm";
import PendingAccScreen from "./PendingAccScreen";
import PersistLogin from "./PersistLogin";
import VerifyCodeScreen from "./VerifyCodeScreen";
import ChangePassScreen from "./ChangePassScreen";

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

  console.log(auth);

  return (
    <View style={{ flex: 1 }}>
      <PersistLogin>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              orientation: "portrait",
              headerShown: false,
              animation: "fade",
              navigationBarHidden: true,
            }}
          >
            {auth?.authenticated ? (
              auth?.isApprove ? (
                <Stack.Screen
                  name="HomeScreen"
                  options={{ animation: "slide_from_bottom" }}
                  component={HomeScreen}
                />
              ) : (
                <Stack.Screen
                  name="PendingAcc"
                  options={{ animation: "slide_from_bottom" }}
                  component={PendingAccScreen}
                />
              )
            ) : (
              <Stack.Screen
                name="LoginScreen"
                options={{ animation: "slide_from_bottom" }}
                component={LoginScreen}
              />
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

            <Stack.Screen
              name="PersonalInfo"
              options={{ animation: "slide_from_right" }}
              component={PersonalInfoFrom1}
            />

            <Stack.Screen
              name="PersonalInfo2"
              options={{ animation: "slide_from_right" }}
              component={PersonalInfoFrom2}
            />

            <Stack.Screen
              name="PersonalInfo3"
              options={{ animation: "slide_from_right" }}
              component={PersonalInfoFrom3}
            />

            <Stack.Screen
              name="FarmProfile1"
              options={{ animation: "slide_from_right" }}
              component={FarmProfileForm1}
            />
            <Stack.Screen
              name="FarmProfile2"
              options={{ animation: "slide_from_right" }}
              component={FarmProfileForm2}
            />
            <Stack.Screen
              name="FarmProfile3"
              options={{ animation: "slide_from_right" }}
              component={FarmProfileForm3}
            />
            <Stack.Screen
              name="ReviewForm"
              options={{ animation: "slide_from_right" }}
              component={ReviewForm}
            />
            <Stack.Screen
              name="VerifyCode"
              options={{ animation: "slide_from_right" }}
              component={VerifyCodeScreen}
            />
            <Stack.Screen
              name="ChangePass"
              options={{ animation: "slide_from_right" }}
              component={ChangePassScreen}
            />
          </Stack.Navigator>
          {/* <BgMusic /> */}
          <StatusBar animated translucent />
        </NavigationContainer>
      </PersistLogin>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Layout;
