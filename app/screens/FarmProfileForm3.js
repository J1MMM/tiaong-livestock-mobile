import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import axios from "../api/axios";
import ButtonContained from "../components/ButtonContained";
import ButtonOutlined from "../components/ButtonOutlined";
import InputField from "../components/InputField";
import RadioInputField from "../components/RadioInputField";
import { BRGY } from "../utils/constant";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";
import Collapsible from "react-native-collapsible";
import Checkbox from "expo-checkbox";
import CheckboxInput from "../components/CheckBoxInput";

const ScreenWidth = Dimensions.get("window").width;

const FarmProfileForm3 = () => {
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
    if (true) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("FarmProfile4");
  };

  useEffect(() => {
    setErrMsg("");
  }, [userData]);

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
        {errMsg && (
          <Text style={{ color: "#FC0F3B", fontWeight: "bold" }}>{errMsg}</Text>
        )}

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
  );
};

export default FarmProfileForm3;
