import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "../api/axios";
import ButtonContained from "../components/ButtonContained";
import ButtonOutlined from "../components/ButtonOutlined";
import TextField from "../components/TextField";
import AlertModal from "../components/AlertModal";

const ChangePassScreen = ({ route }) => {
  const navigate = useNavigation();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { id } = route.params;

  const submitResetPass = async () => {
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.post("/reset", {
        password,
        password2,
        id: id?.id,
      });

      // navigate.dispatch(StackActions.replace("LoginScreen"));
      setModalShow(true);
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
            Create new password
          </Text>
          <Text style={{}}>
            Your new password must be different form previous used passwords.
          </Text>
        </View>

        {errMsg && (
          <Text style={{ color: "#FC0F3B", marginBottom: -5, maxWidth: 350 }}>
            {errMsg}
          </Text>
        )}

        <TextField
          placeholder="Password"
          disabled={disabled}
          errMsg={errMsg}
          onChangeText={(e) => setPassword(e)}
          type="text"
          value={password}
        />
        <TextField
          placeholder="Confirm Password"
          disabled={disabled}
          errMsg={errMsg}
          onChangeText={(e) => setPassword2(e)}
          type="text"
          value={password2}
        />

        <View style={{ width: "100%", gap: 8 }}>
          <ButtonContained
            onPress={submitResetPass}
            disabled={disabled}
            label={disabled ? "Loading..." : "Reset Password"}
          />
          <ButtonOutlined
            onPress={() => navigate.goBack()}
            disabled={disabled}
            label="Go Back"
          />
        </View>
      </View>
      <AlertModal
        visible={modalShow}
        onClose={() => {
          navigate.dispatch(StackActions.replace("LoginScreen"));
          setModalShow(false);
        }}
        content="Your password has been updated. Thank you for your effort!"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChangePassScreen;
