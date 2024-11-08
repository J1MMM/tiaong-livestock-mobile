import { useNavigation } from "@react-navigation/native";
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
import { BRGY } from "../utils/constant";
import Dropdown from "../components/Dropdown";
import useData from "../hooks/useData";
import TextLabel from "../components/TextLabel";
import Collapsible from "react-native-collapsible";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const ReviewForm = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const [verificationCode, setVerificationCode] = useState("");
  const [brgy, setBrgy] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handlePressSubmit = () => {};

  useEffect(() => {
    setErrMsg("");
  }, [userData]);

  const pickIDImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData((prev) => ({ ...prev, idImage: result.assets[0].uri }));
    }
  };

  const pickUserImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData((prev) => ({ ...prev, userImage: result.assets[0].uri }));
    }
  };

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
          width: "100%",
          borderRadius: 8,
          gap: 16,
          height: ScreenHeight - 32,
          padding: 24,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
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
              marginTop: -8,
            }}
          >
            Review your form
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
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
                {userData?.religion}
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
            }}
          >
            <TextLabel style={{ maxWidth: "none", marginBottom: 8 }}>
              Household Information
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
              <TextLabel>Mother's Maiden Name:</TextLabel>
              <TextLabel>Household Head:</TextLabel>
              <TextLabel>Household Head Name:</TextLabel>
              <TextLabel>Relationship to Head:</TextLabel>
              <TextLabel>Living Household Members:</TextLabel>
              <TextLabel>No. of Males:</TextLabel>
              <TextLabel>No. of Females:</TextLabel>
            </View>
            <View style={{ gap: 4, justifyContent: "space-between" }}>
              <TextLabel style={{ color: "#888" }}>
                {userData?.motherMaidenName}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.householdHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.householdHead == "Yes"
                  ? fullname
                  : userData?.nameOfHouseholdHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.numberOfLivingHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>{"Self"}</TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.numberOfLivingHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.noMale}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.noFemale}
              </TextLabel>
            </View>
          </View>

          <View
            style={{
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
              <TextLabel>Mother's Maiden Name:</TextLabel>
              <TextLabel>Household Head:</TextLabel>
              <TextLabel>Household Head Name:</TextLabel>
              <TextLabel>Relationship to Head:</TextLabel>
              <TextLabel>Living Household Members:</TextLabel>
              <TextLabel>No. of Males:</TextLabel>
              <TextLabel>No. of Females:</TextLabel>
            </View>
            <View style={{ gap: 4, justifyContent: "space-between" }}>
              <TextLabel style={{ color: "#888" }}>
                {userData?.motherMaidenName}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.householdHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.householdHead == "Yes"
                  ? fullname
                  : userData?.nameOfHouseholdHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.numberOfLivingHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>{"Self"}</TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.numberOfLivingHead}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.noMale}
              </TextLabel>
              <TextLabel style={{ color: "#888" }}>
                {userData?.noFemale}
              </TextLabel>
            </View>
          </View>
        </ScrollView>

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
            <ButtonContained onPress={() => navigate.goBack()} label="Edit" />
          </View>
          <View
            style={{
              width: "50%",
            }}
          >
            <ButtonContained label="Submit" onPress={handlePressSubmit} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewForm;
