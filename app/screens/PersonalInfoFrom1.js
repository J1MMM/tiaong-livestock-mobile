import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "../api/axios";
import ButtonContained from "../components/ButtonContained";
import ButtonOutlined from "../components/ButtonOutlined";
import InputField from "../components/InputField";
import RadioInputField from "../components/RadioInputField";
import { BRGY } from "../utils/constant";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";

const PersonalInfoFrom1 = () => {
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
        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
            }}
          >
            ANI AT KITA
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              marginTop: -8,
            }}
          >
            RSBSA ENROLLMENT FORM
          </Text>
        </View>

        {errMsg && (
          <Text style={{ color: "#FC0F3B", fontWeight: "bold" }}>{errMsg}</Text>
        )}

        <InputField
          disabled={disabled}
          label="Surname"
          value={userData.surname}
          onChangeText={(value) =>
            setUserData((prev) => ({ ...prev, surname: value }))
          }
        />

        <InputField
          disabled={disabled}
          label="First Name"
          value={userData.firstname}
          onChangeText={(value) =>
            setUserData((prev) => ({ ...prev, firstname: value }))
          }
        />

        <InputField
          label="Middle Name"
          disabled={disabled}
          value={userData.middlename}
          onChangeText={(value) =>
            setUserData((prev) => ({ ...prev, middlename: value }))
          }
        />

        <InputField
          label="Extension Name"
          disabled={disabled}
          value={userData.extensionName}
          onChangeText={(value) =>
            setUserData((prev) => ({ ...prev, extensionName: value }))
          }
        />

        <RadioInputField
          label="Sex"
          options={["Male", "Female"]}
          value={userData.sex}
          setValue={(value) => setUserData((prev) => ({ ...prev, sex: value }))}
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
          value={userData.houseNo}
          onChangeText={(value) =>
            setUserData((prev) => ({ ...prev, houseNo: value }))
          }
        />

        <InputField
          label="Street/Sitio/Subdv"
          disabled={disabled}
          value={userData.street}
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
            <ButtonOutlined onPress={() => navigate.goBack()} label="Cancel" />
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

export default PersonalInfoFrom1;
