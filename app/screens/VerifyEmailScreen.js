import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const VerifyEmailScreen = ({ route }) => {
  const navigate = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { email } = route.params;

  console.log("email");
  console.log(email);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
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
            <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 8 }}>
              Verify Your Account
            </Text>
            <Text style={{}}>
              Please enter the verification code sent to your email address.
            </Text>
            <Text style={{ color: "#007bff", fontWeight: "bold" }}>
              Your email is: {email || ""}
            </Text>
          </View>

          <View
            style={[
              styles.inputControl,
              { borderColor: errMsg ? "#FC0F3B" : "#e0e0e0" },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter verificatiion code"
              placeholderTextColor="#888"
              onChangeText={(e) => setVerificationCode(e)}
              value={verificationCode}
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
            onPress={() => {}}
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
              {disabled ? "Loading..." : "Verify Account"}
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
              Resend Code
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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

export default VerifyEmailScreen;
