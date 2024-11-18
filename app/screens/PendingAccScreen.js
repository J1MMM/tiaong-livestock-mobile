import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import ButtonContained from "../components/ButtonContained";
import useAuth from "../hooks/useAuth";
import * as SecureStore from "expo-secure-store";

const PendingAccScreen = () => {
  const navigate = useNavigation();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const handleLogout = async () => {
    setAuth((prev) => ({ authenticated: false }));
    await SecureStore.deleteItemAsync("refreshToken");

    // navigate.reset({
    //   index: 0,
    //   routes: [{ name: "LoginScreen" }],
    // });
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
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              color: "#007bff",
              textAlign: "center",
            }}
          >
            Account Under Review
          </Text>
          <Text style={{ textAlign: "center" }}>
            Your account creation is under review. Please be patient while we
            process your request.
          </Text>
          <Text
            style={{
              color: "#007bff",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 16,
              fontSize: 16,
            }}
          >
            Thank you for your understanding.
          </Text>
          <Text style={{ textAlign: "center", marginBottom: 16 }}>
            if you want to check it again, please log in to your account again
          </Text>

          <ButtonContained onPress={handleLogout} label="Go to Login" />
        </View>
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

export default PendingAccScreen;
