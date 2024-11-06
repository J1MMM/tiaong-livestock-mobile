import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
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
import DropdownBrgy from "./DropdownBrgy";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const PersonalInfo2Screen = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const [verificationCode, setVerificationCode] = useState("");
  const [brgy, setBrgy] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handlePressNextBtn = () => {
    if (
      !userData.surname ||
      !userData.firstname ||
      !userData.sex ||
      !userData.address ||
      !userData.houseNo ||
      !userData.street ||
      !userData.barangay
    ) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("PersonalInfo2");
  };

  useEffect(() => {
    setErrMsg("");
  }, [userData]);

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  const showDatepicker = () => {
    showMode("date");
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
          {errMsg && (
            <Text style={{ color: "#FC0F3B", fontWeight: "bold" }}>
              {errMsg}
            </Text>
          )}

          <InputField
            disabled={disabled}
            label="Contact No"
            value={useData.contactNo}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, contactNo: value }))
            }
          />

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TextLabel>Date of Birth:</TextLabel>

            <Pressable
              onPress={showDatepicker}
              style={{
                flex: 1,
                borderBottomWidth: 2,
                borderColor: "#e0e0e0",
              }}
            >
              <Text style={{ color: "#e0e0e0", fontSize: 16 }}>
                {date.toLocaleString()}
              </Text>
            </Pressable>
          </View>
          {/* here  */}

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
              <ButtonContained onPress={() => navigate.goBack()} label="Back" />
            </View>
            <View
              style={{
                width: "50%",
              }}
            >
              <ButtonContained label="Next" onPress={handlePressNextBtn} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfo2Screen;
