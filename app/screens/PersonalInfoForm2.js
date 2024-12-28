import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ButtonContained from "../components/ButtonContained";
import InputField from "../components/InputField";
import RadioInputField from "../components/RadioInputField";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";

import DatePicker from "../components/DatePicker";
import Collapsible from "react-native-collapsible";
import CollapsibleField from "../components/Collapsible";

const PersonalInfoFrom2 = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [religionIsCollapsed, setReligionIsCollapsed] = useState(true);
  const [civilStatusIsCollapsed, setCivilStatusIsCollapsed] = useState(true);
  const [householdHeadIsCollapsed, setHouseholdHeadIsCollapsed] =
    useState(true);

  const handlePressNextBtn = () => {
    if (
      !userData.contactNo ||
      !userData.birthDate ||
      !userData.birthPlace ||
      !userData.religion ||
      !userData.civilStatus ||
      !userData.householdHead ||
      !userData.numberOfLivingHead
    ) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("PersonalInfo3");
  };

  useEffect(() => {
    setReligionIsCollapsed(userData.religion == "Others" ? false : true);
    setCivilStatusIsCollapsed(userData.civilStatus == "Married" ? false : true);
    setHouseholdHeadIsCollapsed(userData?.householdHead == "No" ? false : true);
  }, [userData]);

  useEffect(() => {
    setErrMsg("");
  }, [userData]);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled" // Ensures keyboard does not interfere
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
            value={userData.contactNo}
            inputMode="tel"
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, contactNo: value }))
            }
          />

          <DatePicker
            label={"Date of Birth"}
            date={
              userData?.birthDate ? new Date(userData?.birthDate) : new Date()
            }
            setDate={(v) => setUserData((prev) => ({ ...prev, birthDate: v }))}
          />

          <InputField
            disabled={disabled}
            label="Place of Birth"
            value={userData.birthPlace}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, birthPlace: value }))
            }
          />

          <Dropdown
            label="Religion"
            placeholder="Select your religion:"
            options={[
              "Catholic",
              "Iglesia ni Cristo",
              "Islam",
              "Aglipayan Church(Philippine Independent Church)",
              "Protestantism",
              "Jehovah's Witnesses",
              "Born Again Christianity",
              "Others",
            ]}
            value={userData.religion}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, religion: value }))
            }
          />

          <Collapsible
            collapsed={religionIsCollapsed}
            style={{ width: "100%" }}
          >
            <InputField
              disabled={disabled || userData.religion != "Others"}
              label="Specify Religion"
              value={userData.specifyReligion}
              onChangeText={(value) =>
                setUserData((prev) => ({ ...prev, specifyReligion: value }))
              }
            />
          </Collapsible>

          <Dropdown
            label="Civil Status"
            placeholder="Select your civil status:"
            options={["Single", "Married", "Widowed", "Separated"]}
            value={userData.civilStatus}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, civilStatus: value }))
            }
          />
          <Collapsible
            collapsed={civilStatusIsCollapsed}
            style={{ width: 300 }}
          >
            <InputField
              label="Name of Spouse(if married)"
              disabled={disabled}
              value={userData.spouseName}
              onChangeText={(value) =>
                setUserData((prev) => ({ ...prev, spouseName: value }))
              }
            />
          </Collapsible>
          <InputField
            label="Mother's Maiden Name"
            disabled={disabled}
            value={userData.motherMaidenName}
            onChangeText={(value) =>
              setUserData((prev) => ({ ...prev, motherMaidenName: value }))
            }
          />

          <RadioInputField
            label="Household Head"
            options={["Yes", "No"]}
            value={userData.householdHead}
            setValue={(value) =>
              setUserData((prev) => ({ ...prev, householdHead: value }))
            }
          />

          <Collapsible
            collapsed={householdHeadIsCollapsed}
            style={{ width: "100%" }}
          >
            <InputField
              label="If no, Name of Household Head"
              disabled={disabled}
              value={userData.nameOfHouseholdHead}
              onChangeText={(value) =>
                setUserData((prev) => ({ ...prev, nameOfHouseholdHead: value }))
              }
            />
            <InputField
              label="Relationship"
              disabled={disabled}
              value={userData.householdRelationship}
              onChangeText={(value) =>
                setUserData((prev) => ({
                  ...prev,
                  householdRelationship: value,
                }))
              }
            />
          </Collapsible>
          <InputField
            label="No. of Living Household Members"
            disabled={disabled}
            value={userData.numberOfLivingHead}
            inputMode="numeric"
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
                label="No. of Male"
                disabled={disabled}
                value={userData.noMale}
                inputMode="numeric"
                onChangeText={(value) =>
                  setUserData((prev) => ({ ...prev, noMale: value }))
                }
              />
            </View>
            <View style={{ width: "50%" }}>
              <InputField
                label="No. of Female"
                disabled={disabled}
                value={userData.noFemale}
                inputMode="numeric"
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
    </ScrollView>
  );
};

export default PersonalInfoFrom2;
