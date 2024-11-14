import React, { useState, useEffect, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PAGE_CONTAINER_STYLES } from "../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useData from "../hooks/useData";
import { withTiming } from "react-native-reanimated";
const logo = require("../../assets/images/logo.jpg");
const ScreenWidth = Dimensions.get("window").width;

const SignupTab = ({ setLoginScreenActive, translateX }) => {
  const navigate = useNavigation();
  const { setAuth } = useAuth();
  const { setUserData } = useData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  const [pwdVisible, setPwdVisible] = useState(false);
  const [pwdVisible2, setPwdVisible2] = useState(false);

  useFocusEffect(
    useCallback(() => {
      translateX.value = withTiming(ScreenWidth / 2 - 26);

      setTimeout(() => {
        setLoginScreenActive(false);
      }, 100);
    }, [])
  );
  const handleSubmitSignup = async () => {
    setFormDisabled(true);
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setErrMsg("No Internet Connection");
        setFormDisabled(false);
        return;
      }
    });

    try {
      const response = await axios.post("/signup", {
        email,
        password,
        password2,
      });
      console.log("response.data");
      console.log(response.data);
      setEmail("");
      setPassword("");
      setPassword2("");

      navigate.navigate("VerifyEmail", { email: email, id: response.data });
      setUserData((prev) => ({ ...prev, id: response.data }));
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message);
    }

    setFormDisabled(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, password, password2]);

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
          placeholder="Email Address"
          placeholderTextColor="#888"
          onChangeText={(e) => setEmail(e)}
          value={email}
          autoComplete="email"
          inputMode="email"
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

      <View
        style={[
          styles.inputControl,
          { borderColor: errMsg ? "#FC0F3B" : "#e0e0e0" },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry={!pwdVisible2}
          onChangeText={(e) => setPassword2(e)}
          value={password2}
          editable={!formDisabled}
        />
        <Pressable
          onPress={() => setPwdVisible2((v) => !v)}
          style={{ marginRight: 8 }}
        >
          {pwdVisible2 ? (
            <Ionicons name="eye" size={24} color={"#888"} />
          ) : (
            <Ionicons name="eye-off" size={24} color={"#888"} />
          )}
        </Pressable>
      </View>

      <Pressable
        style={styles.loginButton}
        onPress={handleSubmitSignup}
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
          {formDisabled ? "Loading..." : "Signup"}
        </Text>
      </Pressable>
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

export default SignupTab;
