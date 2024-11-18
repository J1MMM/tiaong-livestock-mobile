import React, { useState, useEffect, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import * as SecureStore from "expo-secure-store";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PAGE_CONTAINER_STYLES } from "../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { withTiming } from "react-native-reanimated";
const logo = require("../../assets/images/logo.jpg");

const LoginTab = ({
  handleNavigateSignup,
  setLoginScreenActive,
  translateX,
}) => {
  const { setAuth } = useAuth();
  const { setUserData } = useData();
  const navigate = useNavigation();
  const [referenceNo, setReferenceNo] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  const [pwdVisible, setPwdVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      translateX.value = withTiming(0);

      setTimeout(() => {
        setLoginScreenActive(true);
      }, 100);
    }, [])
  );

  const handleLogin = async () => {
    setFormDisabled(true);
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setErrMsg("No Internet Connection");
        setFormDisabled(false);
        return;
      }
    });

    try {
      const response = await axios.post("/auth", { referenceNo, password });
      await SecureStore.setItemAsync(
        "refreshToken",
        JSON.stringify(response.data?.refreshToken)
      );
      setUserData(response.data);
      setAuth((prev) => ({
        ...prev,
        authenticated: true,
        isApprove: response.data?.isApprove,
        id: response.data?.id,
      }));
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message);
    }

    setFormDisabled(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [referenceNo, password]);

  return (
    <View style={{ gap: 16, alignItems: "center", backgroundColor: "#FFF" }}>
      {errMsg && (
        <Text style={{ color: "#FC0F3B", marginBottom: -5, maxWidth: 350 }}>
          {errMsg}
        </Text>
      )}
      <View
        style={[
          styles.inputControl,
          { borderColor: errMsg ? "#FC0F3B" : "#e0e0e0" },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email / Reference No."
          placeholderTextColor="#888"
          onChangeText={(e) => setReferenceNo(e)}
          value={referenceNo}
          inputMode="text"
          editable={!formDisabled}
        />
      </View>
      <View
        style={[
          styles.inputControl,
          { borderColor: errMsg ? "#FC0F3B" : "#e0e0e0" },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!pwdVisible}
          onChangeText={(e) => setPassword(e)}
          value={password}
          editable={!formDisabled}
        />
        <Pressable
          onPress={() => setPwdVisible((v) => !v)}
          style={{ marginRight: 8 }}
        >
          {pwdVisible ? (
            <Ionicons name="eye" size={24} color={"#888"} />
          ) : (
            <Ionicons name="eye-off" size={24} color={"#888"} />
          )}
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigate.navigate("ForgotPass")}
        style={{ marginLeft: 8, marginTop: -8, alignSelf: "flex-start" }}
      >
        <Text style={{ fontWeight: 500, color: "#007bff" }}>
          Forgot Password
        </Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={formDisabled}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          {formDisabled ? "Loading..." : "Login"}
        </Text>
      </Pressable>
      <View style={{ justifyContent: "center", flexDirection: "row" }}>
        <Text style={{ fontWeight: 500 }}>Not a member? </Text>
        <Pressable
          onPress={handleNavigateSignup}
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Text style={{ fontWeight: 500, color: "#007bff" }}>Signup now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 20,
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    width: "100%",
  },
  input: {
    fontSize: 16,
    padding: 10,
    letterSpacing: 1,
    flex: 1,
    width: "100%",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

export default LoginTab;
