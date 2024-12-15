import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Dimensions,
  Button,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginTab from "./LoginTab";
import { useNavigation } from "@react-navigation/native";
import SignupTab from "./SignupTab";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const logo = require("../../assets/images/logo.jpg");
const ScreenWidth = Dimensions.get("window").width;
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const LoginScreen = () => {
  const navigate = useNavigation();
  const AnimatedView = Animated.createAnimatedComponent(View);
  const translateX = useSharedValue(0);

  const [loginScreenActive, setLoginScreenActive] = useState(true);

  const handleNavigateLogin = () => {
    navigate.navigate("Login");
  };

  const handleNavigateSignup = () => {
    navigate.navigate("Signup");
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.navContainer}>
        <AnimatedView
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            borderRadius: 24,
          }}
        >
          <AnimatedView
            style={[
              {
                backgroundColor: "#007bff",
                width: "50%",
                height: "100%",
                borderRadius: 24,
              },
              animatedStyle,
            ]}
          />
        </AnimatedView>
        <Pressable style={styles.navBtn} onPress={handleNavigateLogin}>
          <Text
            style={{
              ...styles.navBtnTxt,
              color: loginScreenActive ? "#FFF" : "#000",
            }}
          >
            Login
          </Text>
        </Pressable>

        <Pressable style={styles.navBtn} onPress={handleNavigateSignup}>
          <Text
            style={{
              ...styles.navBtnTxt,
              color: !loginScreenActive ? "#FFF" : "#000",
            }}
          >
            Signup
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 24,
        gap: 24,
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          gap: 40,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Image source={logo} style={{ maxWidth: 125, maxHeight: 125 }} />
        </View>

        {/* <View style={styles.navContainer}>
          <AnimatedView
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              borderRadius: 24,
            }}
          >
            <AnimatedView
              style={[
                {
                  backgroundColor: "#007bff",
                  width: "50%",
                  height: "100%",
                  borderRadius: 24,
                },
                animatedStyle,
              ]}
            />
          </AnimatedView>
          <Pressable style={styles.navBtn} onPress={handleNavigateLogin}>
            <Text
              style={{
                ...styles.navBtnTxt,
                color: loginScreenActive ? "#FFF" : "#000",
              }}
            >
              Login
            </Text>
          </Pressable>

          <Pressable style={styles.navBtn} onPress={handleNavigateSignup}>
            <Text
              style={{
                ...styles.navBtnTxt,
                color: !loginScreenActive ? "#FFF" : "#000",
              }}
            >
              Signup
            </Text>
          </Pressable>
        </View> */}
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
        }}
      >
        <Tab.Navigator
          initialRouteName="Login"
          // screenOptions={{
          //   headerShown: false,
          //   animation: "slide_from_right",
          //   contentStyle: {
          //     backgroundColor: "#FFF",
          //   },
          // }}

          screenOptions={{
            headerShown: false,
            animation: "shift",
            sceneStyle: { backgroundColor: "#FFF" },
            tabBarPosition: "top",
          }}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tab.Screen name="Login">
            {() => (
              <LoginTab
                handleNavigateSignup={handleNavigateSignup}
                setLoginScreenActive={setLoginScreenActive}
                translateX={translateX}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Signup">
            {() => (
              <SignupTab
                setLoginScreenActive={setLoginScreenActive}
                translateX={translateX}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 32,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  navContainer: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    borderRadius: 24,
    width: "100%",
    backgroundColor: "#FFF",
    marginBottom: 32,
  },

  navBtn: {
    padding: 16,
    // borderWidth: 1,
    // borderColor: "#0056b3",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#007bff",
    flex: 1,
  },
  navBtnTxt: {
    // color: "#FFF",
    fontWeight: "800",
  },
});

export default LoginScreen;
