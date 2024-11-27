import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "../api/axios";

const ForgotPassScreen = () => {
  const navigate = useNavigation();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSendCode = async () => {
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.post("/reset/send-code", { email: email });
      console.log(response.data);
      setEmail("");
      navigate.navigate("VerifyCode", { email: email, id: response.data });
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data);
    }
    setDisabled(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEF2F6",
        padding: 24,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF",
          width: "100%",
          alignItems: "center",
          padding: 24,
          borderRadius: 8,
          gap: 16,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>
            Forgot Password?
          </Text>
          <Text style={{}}>
            You will receive link for reseting your password.
          </Text>
        </View>

        {errMsg && (
          <Text style={{ color: "#FC0F3B", maxWidth: 350 }}>{errMsg}</Text>
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
            editable={!disabled}
          />
        </View>

        <Pressable
          style={{
            ...styles.loginButton,
            backgroundColor: "#007bff",
            marginTop: 8,
          }}
          onPress={handleSendCode}
          disabled={disabled}
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
            {disabled ? "Sending..." : "Reset Password"}
          </Text>
        </Pressable>

        <Pressable
          style={{
            ...styles.loginButton,
            borderWidth: 2,
            borderColor: "#007bff",
            marginTop: -8,
          }}
          onPress={() => navigate.goBack()}
          disabled={disabled}
        >
          <Text
            style={{
              color: "#007bff",
              fontSize: 16,
              fontWeight: "700",
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Cancel
          </Text>
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
    padding: 16,
    letterSpacing: 1,
    flex: 1,
    width: "100%",
    fontWeight: "600",
  },

  loginButton: {
    padding: 12,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

export default ForgotPassScreen;
