import { View, Text, Button } from "react-native";
import React, { useCallback } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "react-native";
import useAuth from "../hooks/useAuth";
import * as SecureStore from "expo-secure-store";
import TextField from "../components/TextField";
import InputField from "../components/InputField";
import UseLogout from "../hooks/useLogout";

const ProfileScreen = () => {
  const { setActiveScreen, userData } = useData();
  const { setAuth } = useAuth();
  const logout = UseLogout();

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Profile");
    }, [])
  );

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: 24,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          padding: 24,
        }}
      >
        {userData?.userImage && (
          <Image
            source={{ uri: userData?.userImage }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 150,
              borderWidth: 2,
              borderColor: "#007bff",
            }}
          />
        )}
        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#007bff",
              maxWidth: 250,
            }}
          >
            {userData?.fullname}
          </Text>

          <Text
            style={{
              fontWeight: "bold",
              color: "#888",
              width: "100%",
            }}
          >
            Email: {userData?.email}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#888",
              width: "100%",
            }}
          >
            Contact No: {userData?.contactNo}
          </Text>
          <View style={{ justifyContent: "center", marginTop: 16 }}>
            <Button color="#CC3949" title="logout" onPress={logout} />
          </View>
        </View>
      </View>
      <View style={{ width: "100%", paddingHorizontal: 8, gap: 8 }}>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Birthdate:{" "}
          {userData?.birthDate &&
            new Date(userData?.birthDate).toLocaleDateString("en-GB")}
        </Text>

        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Place of Birth: {userData?.birthPlace}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Religion:{" "}
          {userData?.religion == "Others"
            ? userData?.specifyReligion
            : userData?.religion}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Civil Status: {userData?.civilStatus}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Spouse Name: {userData?.spouseName}
        </Text>

        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Mother's Maiden Name: {userData?.motherMaidenName}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Household Head: {userData?.householdHead}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Highest Formal Education: {userData?.education}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Main Livelihood: {userData?.livelihood}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#888",
            width: "100%",
          }}
        >
          Location: {userData?.houseNo}, {userData?.street},{" "}
          {userData?.barangay} Tiaong Quezon
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
