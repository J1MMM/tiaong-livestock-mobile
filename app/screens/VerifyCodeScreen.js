import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "../api/axios";
import ButtonContained from "../components/ButtonContained";
import ButtonOutlined from "../components/ButtonOutlined";
import TextField from "../components/TextField";

const VerifyEmailScreen = ({ route }) => {
  const navigate = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { email, id } = route.params;

  const submitVerification = async () => {
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.post("/verify-code", {
        verificationCode,
        id: id?.id,
      });

      navigate.dispatch(StackActions.replace("ChangePass", { email, id }));
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message);
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
          <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 8 }}>
            Verify your code
          </Text>
          <Text style={{}}>We have sent a code to your email.</Text>
          <Text style={{ color: "#007bff", fontWeight: "bold" }}>
            Your email is: {email || ""}
          </Text>
        </View>

        {errMsg && (
          <Text style={{ color: "#FC0F3B", marginBottom: -5, maxWidth: 350 }}>
            {errMsg}
          </Text>
        )}

        <TextField
          placeholder="Enter verification code"
          disabled={disabled}
          errMsg={errMsg}
          onChangeText={(e) => setVerificationCode(e)}
          type="text"
          value={verificationCode}
        />
        <View style={{ width: "100%", gap: 8 }}>
          <ButtonContained
            onPress={submitVerification}
            disabled={disabled}
            label={disabled ? "Loading..." : "Verify Code"}
          />
          <ButtonOutlined
            onPress={() => navigate.goBack()}
            disabled={disabled}
            label="Go Back"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default VerifyEmailScreen;
