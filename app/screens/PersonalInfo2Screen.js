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
import RadioInputField from "../components/RadioInputField";
import RNPickerSelect from "react-native-picker-select";
import { BRGY } from "../utils/constant";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";
import DatePicker from "../components/DatePicker";

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
    console.log(userData);
    if (
      !userData.contactNo ||
      !userData.birthDate ||
      !userData.birthPlace ||
      !userData.religion ||
      !userData.civilStatus ||
      !userData.householdHead
    ) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("PersonalInfo");
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

          <DatePicker
            label={"Date of Birth"}
            date={userData.birthDate || new Date()}
            setDate={(v) => setUserData((prev) => ({ ...prev, birthDate: v }))}
          />

          <InputField
            disabled={disabled}
            label="Place of Birth"
            value={useData.birthPlace}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, birthPlace: value }))
            }
          />

          <Dropdown
            label="Religion"
            placeholder="Select your religion:"
            options={["Christianity", "Islam", "Others"]}
            value={userData.religion}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, religion: value }))
            }
          />

          <InputField
            disabled={disabled || userData.religion != "Others"}
            label="Specify Religion"
            value={useData.specifyReligion}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, specifyReligion: value }))
            }
          />

          <Dropdown
            label="Civil Status"
            placeholder="Select your civil status:"
            options={["Single", "Married", "Widowed", "Separated"]}
            value={userData.civilStatus}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, civilStatus: value }))
            }
          />

          <InputField
            label="Name of Spouse(if married)"
            disabled={disabled}
            value={useData.spouseName}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, spouseName: value }))
            }
          />
          <InputField
            label="Mother's Maiden Name"
            disabled={disabled}
            value={useData.motherMaidenName}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, motherMaidenName: value }))
            }
          />

          <RadioInputField
            label="Household Held"
            options={["Yes", "No"]}
            value={userData.householdHeld}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, householdHeld: value }))
            }
          />

          <InputField
            label="If no, name of household head"
            disabled={disabled}
            value={useData.nameOfHouseholdHead}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, nameOfHouseholdHead: value }))
            }
          />
          <InputField
            label="No. of living household members"
            disabled={disabled}
            value={useData.numberOfLivingHead}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, numberOfLivingHead: value }))
            }
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ width: "50%" }}>
              <InputField
                label="No. of male"
                disabled={disabled}
                value={useData.noMale}
                onChangeText={(value) =>
                  setUserData((prev) => ({ ...prev, noMale: value }))
                }
              />
            </View>
            <View style={{ width: "50%" }}>
              <InputField
                label="No. of female"
                disabled={disabled}
                value={useData.noFemale}
                onChangeText={(value) =>
                  setUserData((prev) => ({ ...prev, noFemale: value }))
                }
              />
            </View>
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
