import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, Image, Text, View } from "react-native";
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

const FarmProfileForm3 = () => {
  const navigate = useNavigation();
  const { userData, setUserData } = useData();
  const [errMsg, setErrMsg] = useState("");

  const handlePressNextBtn = () => {
    if (!userData?.idImage || !userData?.userImage) {
      setErrMsg("Please fill in all required fields.");
      return;
    }
    navigate.navigate("ReviewForm");
  };

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
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;
      setUserData((prev) => ({
        ...prev,
        idImage: { data: base64Image, contentType: "image/jpeg" },
        idImageUri: result.assets[0].uri,
      }));
    }
  };

  const pickUserImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = result.assets[0].base64;
      setUserData((prev) => ({
        ...prev,
        userImage: { data: base64Image, contentType: "image/jpeg" },
        userImageUri: result.assets[0].uri,
      }));
    }
  };
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

        <TextLabel>Upload Valid ID:</TextLabel>
        <ButtonContained label="Upload Photo" onPress={pickIDImage} />
        {userData.idImageUri && (
          <Image
            source={{ uri: userData.idImageUri }}
            style={{
              width: "100%",
              height: 200,
            }}
          />
        )}

        <TextLabel>Upload 2x2 Picture:</TextLabel>
        <ButtonContained label="Upload Photo" onPress={pickUserImage} />
        {userData.userImageUri && (
          <Image
            source={{ uri: userData.userImageUri }}
            style={{
              width: 200,
              height: 200,
            }}
          />
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
            <ButtonContained label="Submit" onPress={handlePressNextBtn} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FarmProfileForm3;
