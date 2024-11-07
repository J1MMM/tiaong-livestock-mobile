import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ButtonContained from "../components/ButtonContained";
import InputField from "../components/InputField";
import RadioInputField from "../components/RadioInputField";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import DatePicker from "../components/DatePicker";
import Collapsible from "react-native-collapsible";

const PersonalInfoFrom3 = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handlePressNextBtn = () => {
    if (
      !userData.education ||
      !userData.PWD ||
      !userData.memberIndigenousGroup ||
      !userData.withGovernmentID ||
      !userData.memberAssociationOrCooperative ||
      !userData.personToNotifyInCaseEmergency ||
      !userData.contactPersonToNotifyInCaseEmergency
    ) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("FarmProfile1");
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

        <Dropdown
          label="Highest Formal Education"
          options={[
            "None",
            "Elementary",
            "High School",
            "Vocational",
            "College",
            "Post Graduate",
          ]}
          placeholder="Select highest formal education"
          value={userData?.education}
          setValue={(value) =>
            setUserData((prev) => ({ ...prev, education: value }))
          }
        />

        <RadioInputField
          label="Person with Disability(PWD)"
          options={["Yes", "No"]}
          value={userData.PWD}
          setValue={(value) => setUserData((prev) => ({ ...prev, PWD: value }))}
        />

        <RadioInputField
          label="Member of an Indigenous Group"
          options={["Yes", "No"]}
          value={userData.memberIndigenousGroup}
          setValue={(value) =>
            setUserData((prev) => ({ ...prev, memberIndigenousGroup: value }))
          }
        />

        <Collapsible
          collapsed={userData?.memberIndigenousGroup == "Yes" ? false : true}
          style={{ width: "100%" }}
        >
          <InputField
            label="If yes, Specify"
            disabled={disabled}
            value={userData.specifyIndigenousGroup}
            onChangeText={(value) =>
              setUserData((prev) => ({
                ...prev,
                specifyIndigenousGroup: value,
              }))
            }
          />
        </Collapsible>

        <RadioInputField
          label="With Government ID"
          options={["Yes", "No"]}
          value={userData.withGovernmentID}
          setValue={(value) =>
            setUserData((prev) => ({ ...prev, withGovernmentID: value }))
          }
        />

        <Collapsible
          collapsed={userData?.withGovernmentID == "Yes" ? false : true}
          style={{ width: "100%" }}
        >
          <InputField
            label="Specify ID Number"
            disabled={disabled}
            value={userData.specifyGovernmentID}
            onChangeText={(value) =>
              setUserData((prev) => ({
                ...prev,
                specifyGovernmentID: value,
              }))
            }
          />
        </Collapsible>

        <RadioInputField
          label="Member of Farmer's  Association/Coorperative"
          options={["Yes", "No"]}
          value={userData.memberAssociationOrCooperative}
          setValue={(value) =>
            setUserData((prev) => ({
              ...prev,
              memberAssociationOrCooperative: value,
            }))
          }
        />

        <Collapsible
          collapsed={
            userData?.memberAssociationOrCooperative == "Yes" ? false : true
          }
          style={{ width: "100%" }}
        >
          <InputField
            label="If yes, Specify"
            disabled={disabled}
            value={userData.specifyAssociationOrCooperative}
            onChangeText={(value) =>
              setUserData((prev) => ({
                ...prev,
                specifyAssociationOrCooperative: value,
              }))
            }
          />
        </Collapsible>

        <InputField
          label="Person to notify in case of Emergency"
          disabled={disabled}
          value={userData.personToNotifyInCaseEmergency}
          onChangeText={(value) =>
            setUserData((prev) => ({
              ...prev,
              personToNotifyInCaseEmergency: value,
            }))
          }
        />

        <InputField
          label="Contact Number"
          disabled={disabled}
          value={userData.contactPersonToNotifyInCaseEmergency}
          onChangeText={(value) =>
            setUserData((prev) => ({
              ...prev,
              contactPersonToNotifyInCaseEmergency: value,
            }))
          }
        />

        {/* tool bar  */}
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

export default PersonalInfoFrom3;
