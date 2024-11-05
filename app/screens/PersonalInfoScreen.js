import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "../api/axios";
import ButtonContained from "../components/ButtonContained";
import ButtonOutlined from "../components/ButtonOutlined";
import TextField from "../components/TextField";
import InputField from "../components/InputField";
import GenderRadioBtn from "../components/GenderRadioBtn";

const PersonalInfoScreen = () => {
  const navigate = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

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
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "500",
              width: "100%",
            }}
          >
            ANI AT KITA RSBSA ENROLLMENT FORM
          </Text>

          <InputField
            label="Surname"
            disabled={disabled}
            onChangeText={() => {}}
          />

          <InputField
            label="First Name"
            disabled={disabled}
            onChangeText={() => {}}
          />

          <InputField
            label="Middle Name"
            disabled={disabled}
            onChangeText={() => {}}
          />

          <InputField
            label="Extension Name"
            disabled={disabled}
            onChangeText={() => {}}
          />

          <GenderRadioBtn
            handleGenderSelect={handleGenderSelect}
            selectedGender={selectedGender}
          />

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              width: "100%",
              marginBottom: -16,
            }}
          >
            Address:
          </Text>

          <InputField
            label="House/Lot/Bldg. No."
            disabled={disabled}
            onChangeText={() => {}}
          />
          <InputField
            label="Street/Sitio/Subdv."
            disabled={disabled}
            onChangeText={() => {}}
          />
          <InputField
            label="Barangay"
            disabled={disabled}
            onChangeText={() => {}}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              width: "100%",
            }}
          >
            <View
              style={{
                width: "50%",
              }}
            >
              <ButtonContained label="Back" />
            </View>
            <View
              style={{
                width: "50%",
              }}
            >
              <ButtonContained label="Next" />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#777",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  checkedCircle: {
    backgroundColor: "#777",
  },
  radioText: {
    fontSize: 16,
  },
});

export default PersonalInfoScreen;
