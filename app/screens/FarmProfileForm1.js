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
import CheckboxInput from "../components/CheckboxInput";

const ScreenWidth = Dimensions.get("window").width;

const FarmProfileForm1 = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const [verificationCode, setVerificationCode] = useState("");
  const [brgy, setBrgy] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [farmerIsCollapsed, setFarmerIsCollapsed] = useState(true);
  const [livestockCheckedIsCollapsed, setLivestockCheckedIsCollapsed] =
    useState(true);
  const [poultryCheckedIsCollapsed, setPoultryCheckedIsCollapsed] =
    useState(true);
  const [farmworkerIsCollapsed, setFarmworkerIsCollapsed] = useState(true);
  const [kindOfWorkOtherIsCollapsed, setKindOfWorkOtherIsCollapsed] =
    useState(true);

  const handlePressNextBtn = () => {
    if (!userData.livelihood) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("FarmProfile2");
  };

  useEffect(() => {
    setFarmerIsCollapsed(userData.livelihood == "Farmer" ? false : true);
    setLivestockCheckedIsCollapsed(userData?.livestockChecked ? false : true);
    setPoultryCheckedIsCollapsed(userData?.poultryChecked ? false : true);
    setFarmworkerIsCollapsed(
      userData?.livelihood == "Farmworker/Laborer" ? false : true
    );
    setKindOfWorkOtherIsCollapsed(userData?.kindOfWorkOther ? false : true);
  }, [userData]);

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
              fontSize: 24,
              fontWeight: "600",
              marginTop: -8,
            }}
          >
            Farm Profile
          </Text>
        </View>

        {errMsg && (
          <Text style={{ color: "#FC0F3B", fontWeight: "bold" }}>{errMsg}</Text>
        )}

        <Dropdown
          label="Main Livelihood"
          options={["Farmer", "Farmworker/Laborer"]}
          placeholder="Select your Livelihood"
          value={userData?.livelihood}
          setValue={(value) =>
            setUserData((prev) => ({ ...prev, livelihood: value }))
          }
        />
        {/* farmer  */}
        <Collapsible
          collapsed={farmerIsCollapsed}
          style={{ width: "100%", width: ScreenWidth - 100, gap: 8 }}
        >
          <TextLabel style={{ maxWidth: "none" }}>
            Type of Farming Activity:
          </TextLabel>

          <CheckboxInput
            label="Livestock"
            value={userData.livestockChecked}
            onValueChange={(value) =>
              setUserData((prev) => ({ ...prev, livestockChecked: value }))
            }
          />

          <Collapsible
            collapsed={livestockCheckedIsCollapsed}
            style={{ width: "100%" }}
          >
            <InputField
              label="please specify"
              disabled={disabled}
              value={userData.livestockSpecify}
              onChangeText={(value) =>
                setUserData((prev) => ({
                  ...prev,
                  livestockSpecify: value,
                }))
              }
            />
          </Collapsible>

          <CheckboxInput
            label="Poultry"
            value={userData.poultryChecked}
            onValueChange={(value) =>
              setUserData((prev) => ({ ...prev, poultryChecked: value }))
            }
          />

          <Collapsible
            collapsed={poultryCheckedIsCollapsed}
            style={{ width: "100%" }}
          >
            <InputField
              label="please specify"
              disabled={disabled}
              value={userData.poultrySpecify}
              onChangeText={(value) =>
                setUserData((prev) => ({
                  ...prev,
                  poultrySpecify: value,
                }))
              }
            />
          </Collapsible>
        </Collapsible>

        {/* Farmworker  */}
        <Collapsible
          collapsed={farmworkerIsCollapsed}
          style={{ width: "100%", width: ScreenWidth - 100, gap: 8 }}
        >
          <TextLabel style={{ maxWidth: "none" }}>Kind of Work:</TextLabel>

          <CheckboxInput
            label="Land Preparation"
            value={userData.landPreparationChecked}
            onValueChange={(value) =>
              setUserData((prev) => ({
                ...prev,
                landPreparationChecked: value,
              }))
            }
          />
          <CheckboxInput
            label="Harvesting"
            value={userData.harvestingChecked}
            onValueChange={(value) =>
              setUserData((prev) => ({ ...prev, harvestingChecked: value }))
            }
          />

          <CheckboxInput
            label="Others"
            value={userData.kindOfWorkOther}
            onValueChange={(value) =>
              setUserData((prev) => ({ ...prev, kindOfWorkOther: value }))
            }
          />

          <Collapsible
            collapsed={kindOfWorkOtherIsCollapsed}
            style={{ width: "100%" }}
          >
            <InputField
              label="please specify"
              disabled={disabled}
              value={userData.kindOfWorkSpecify}
              onChangeText={(value) =>
                setUserData((prev) => ({
                  ...prev,
                  kindOfWorkSpecify: value,
                }))
              }
            />
          </Collapsible>
        </Collapsible>

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

export default FarmProfileForm1;
