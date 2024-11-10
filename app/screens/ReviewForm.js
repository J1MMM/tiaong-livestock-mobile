import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import axios from "../api/axios";
import ButtonContained from "../components/ButtonContained";
import ButtonOutlined from "../components/ButtonOutlined";
import InputField from "../components/InputField";
import RadioInputField from "../components/RadioInputField";
import { BRGY, USER_INITIAL_DATA } from "../utils/constant";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";
import Collapsible from "react-native-collapsible";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import useAuth from "../hooks/useAuth";
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const ReviewForm = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const { setAuth } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [brgy, setBrgy] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handlePressSubmit = async () => {
    setErrMsg("");
    setDisabled(true);
    try {
      const response = await axios.post("/pending-account", userData);

      console.log(response.data);
      setAuth((prev) => ({ ...prev, authenticated: true }));
      navigate.reset({
        index: 0,
        routes: [{ name: "PendingAcc" }],
      });
      setUserData(USER_INITIAL_DATA);
    } catch (error) {
      console.log(error);
      setErrMsg(error?.response?.data?.message);
    }
    setDisabled(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [userData]);

  const fullname = `${userData?.firstname} ${userData?.middlename} ${userData?.surname}`;

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
          borderRadius: 8,
          height: ScreenHeight - 100,
          overflow: "hidden",
          paddingVertical: 24,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              width: "100%",
              borderRadius: 8,
              gap: 16,
              paddingHorizontal: 24,
            }}
          >
            {errMsg && (
              <Text style={{ color: "#FC0F3B", fontWeight: "bold" }}>
                {errMsg}
              </Text>
            )}

            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              Review your form
            </Text>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
            >
              {userData.userImage && (
                <Image
                  source={{ uri: userData.userImage }}
                  alt="user.jpg"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              )}
              <TextLabel>{fullname}</TextLabel>
            </View>
            {/* personal info sectopn  */}
            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View style={{ gap: 4 }}>
                <TextLabel>Extension Name:</TextLabel>
                <TextLabel>Sex:</TextLabel>
                <TextLabel>Contact No:</TextLabel>
                <TextLabel>Birthdate:</TextLabel>
                <TextLabel>Place of Birth:</TextLabel>
                <TextLabel>Religion:</TextLabel>
                <TextLabel>Civil Status:</TextLabel>
                <TextLabel>Spouse Name:</TextLabel>
              </View>
              <View style={{ gap: 4 }}>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.extensionName}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>{userData?.sex}</TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.contactNo}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.birthDate?.toLocaleDateString("en-GB")}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.birthPlace}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.religion == "Others"
                    ? userData?.specifyReligion
                    : userData?.religion}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.civilStatus}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.spouseName}
                </TextLabel>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                borderBottomWidth: 2,
                borderColor: "#007bff",
                marginTop: 8,
              }}
            >
              <TextLabel style={{ maxWidth: "none", marginBottom: 8 }}>
                Household Information
              </TextLabel>
            </View>
            {/* household info section  */}

            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel>Mother's Maiden Name:</TextLabel>
                <TextLabel>Household Head:</TextLabel>
                <TextLabel>Household Head Name:</TextLabel>
                <TextLabel>Relationship to Head:</TextLabel>
                <TextLabel>Living Household Members:</TextLabel>
                <TextLabel>No. of Males:</TextLabel>
                <TextLabel>No. of Females:</TextLabel>
              </View>
              <View style={{}}>
                <TextLabel style={{ color: "#888", marginTop: 8 }}>
                  {userData?.motherMaidenName}
                </TextLabel>
                <TextLabel style={{ color: "#888", marginTop: 16 }}>
                  {userData?.householdHead}
                </TextLabel>
                <TextLabel style={{ color: "#888", marginTop: 16 }}>
                  {userData?.householdHead == "Yes"
                    ? fullname
                    : userData?.nameOfHouseholdHead}
                </TextLabel>

                <TextLabel style={{ color: "#888", marginTop: 24 }}>
                  {userData?.householdHead == "Yes"
                    ? "Self"
                    : userData?.householdRelationship}
                </TextLabel>
                <TextLabel style={{ color: "#888", marginTop: 24 }}>
                  {userData?.numberOfLivingHead}
                </TextLabel>
                <TextLabel style={{ color: "#888", marginTop: 8 }}>
                  {userData?.noMale}
                </TextLabel>
                <TextLabel style={{ color: "#888", marginTop: 8 }}>
                  {userData?.noFemale}
                </TextLabel>
              </View>
            </View>

            <View
              style={{
                marginTop: 8,
                width: "100%",
                borderBottomWidth: 2,
                borderColor: "#007bff",
              }}
            >
              <TextLabel style={{ maxWidth: "none", marginBottom: 8 }}>
                Education & Membership
              </TextLabel>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel>Highest Formal Education:</TextLabel>
                <TextLabel>Person with Disability(PWD):</TextLabel>
                <TextLabel>4P's Beneficiary:</TextLabel>
                <TextLabel>Indiginous Group Member:</TextLabel>
              </View>
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.education}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>{userData?.PWD}</TextLabel>

                <TextLabel style={{ color: "#888" }}>
                  {userData?._4ps}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.memberIndigenousGroup}
                </TextLabel>
              </View>
            </View>

            <View
              style={{
                marginTop: 8,
                width: "100%",
                borderBottomWidth: 2,
                borderColor: "#007bff",
              }}
            >
              <TextLabel style={{ maxWidth: "none", marginBottom: 8 }}>
                Identification & Emergency
              </TextLabel>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel>Government ID:</TextLabel>
                <TextLabel>Government ID No:</TextLabel>
                <TextLabel>Farmers Association Member:</TextLabel>
                <TextLabel>Emergency Contact Name:</TextLabel>
                <TextLabel>Emergency Contact Number:</TextLabel>
              </View>
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.withGovernmentID == "Yes" &&
                    userData?.specifyGovernmentID}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.withGovernmentID == "Yes" && userData?.idNumber}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.memberAssociationOrCooperative}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.personToNotifyInCaseEmergency}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.contactPersonToNotifyInCaseEmergency}
                </TextLabel>
              </View>
            </View>

            <View
              style={{
                marginTop: 8,
                width: "100%",
                borderBottomWidth: 2,
                borderColor: "#007bff",
              }}
            >
              <TextLabel style={{ maxWidth: "none", marginBottom: 8 }}>
                Location & Livelihood
              </TextLabel>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 16,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel>Main Livelihood:</TextLabel>
                <TextLabel>House/Lot/Bldg:</TextLabel>
                <TextLabel>Street/Sitio/Subd:</TextLabel>
                <TextLabel>Municipality/City:</TextLabel>
                <TextLabel>Province:</TextLabel>
                <TextLabel>Region:</TextLabel>
                <TextLabel>Barangay:</TextLabel>
              </View>
              <View style={{ gap: 4, justifyContent: "space-between" }}>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.livelihood}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.houseNo}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.street}
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>Tiaong</TextLabel>
                <TextLabel style={{ color: "#888" }}>Laguna</TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  IV-A(CALABARZON)
                </TextLabel>
                <TextLabel style={{ color: "#888" }}>
                  {userData?.barangay}
                </TextLabel>
              </View>
            </View>

            <View
              style={{
                marginTop: 8,
                width: "100%",
                borderBottomWidth: 2,
                borderColor: "#007bff",
              }}
            >
              <TextLabel style={{ maxWidth: "none", marginBottom: 8 }}>
                Valid ID
              </TextLabel>
            </View>

            {userData.idImage && (
              <Image
                source={{ uri: userData.idImage }}
                alt="id.jpg"
                style={{
                  width: "100%",
                  height: 200,
                }}
              />
            )}
          </View>
        </ScrollView>
        {/* action buttons  */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            width: "100%",
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
        >
          <View
            style={{
              width: "50%",
            }}
          >
            <ButtonContained
              disabled={disabled}
              onPress={() => navigate.goBack()}
              label="Edit"
            />
          </View>
          <View
            style={{
              width: "50%",
            }}
          >
            <ButtonContained
              disabled={disabled}
              label="Submit"
              onPress={handlePressSubmit}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewForm;
