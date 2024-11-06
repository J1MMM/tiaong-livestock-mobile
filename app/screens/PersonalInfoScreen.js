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
import RadioInputField from "../components/RadioInputField";
import RNPickerSelect from "react-native-picker-select";
import { BRGY } from "../utils/constant";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";

const PersonalInfoScreen = () => {
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

          {errMsg && (
            <Text style={{ color: "#FC0F3B", fontWeight: "bold" }}>
              {errMsg}
            </Text>
          )}

          <InputField
            disabled={disabled}
            label="Surname"
            value={useData.surname}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, surname: value }))
            }
          />

          <InputField
            disabled={disabled}
            label="First Name"
            value={useData.firstname}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, firstname: value }))
            }
          />

          <InputField
            label="Middle Name"
            disabled={disabled}
            value={useData.middlename}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, middlename: value }))
            }
          />

          <InputField
            label="Extension Name"
            disabled={disabled}
            value={useData.extensionName}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, extensionName: value }))
            }
          />

          <RadioInputField
            label="Sex"
            options={["Male", "Female"]}
            value={userData.sex}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, sex: value }))
            }
          />
          <View style={{ width: "100%" }}>
            <TextLabel
              style={{
                marginBottom: -16,
              }}
            >
              Address:
            </TextLabel>
          </View>

          <InputField
            label="House/Lot/Bldg. No"
            disabled={disabled}
            value={useData.houseNo}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, houseNo: value }))
            }
          />

          <InputField
            label="Street/Sitio/Subdv"
            disabled={disabled}
            value={useData.street}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, street: value }))
            }
          />

          <Dropdown
            label="Barangay"
            placeholder="Select your Barangay:"
            options={BRGY}
            value={userData.barangay}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, barangay: value }))
            }
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
              <ButtonContained label="Next" onPress={handlePressNextBtn} />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfoScreen;
