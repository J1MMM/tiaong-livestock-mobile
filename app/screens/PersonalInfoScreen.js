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
import RNPickerSelect from "react-native-picker-select";
import { BRGY } from "../utils/constant";

const PersonalInfoScreen = () => {
  const navigate = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");
  const [brgy, setBrgy] = useState("");
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

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Barangay:
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#e0e0e0",
                flex: 1,
                marginLeft: 8,
              }}
            >
              <RNPickerSelect
                onValueChange={(value) => setBrgy(value)}
                items={BRGY.map((brgy) => ({ label: brgy, value: brgy }))}
                placeholder={{ label: "Select your Barangay:", value: null }}
                style={{
                  inputAndroid: {
                    marginBottom: -8,
                    marginTop: -16,
                  },
                }}
              />
            </View>
          </View>

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
              <ButtonOutlined
                onPress={() => navigate.goBack()}
                label="Cancel"
              />
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

export default PersonalInfoScreen;
