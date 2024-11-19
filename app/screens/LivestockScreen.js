import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import Dropdown from "../components/Dropdown";
import RNPickerSelect from "react-native-picker-select";
import LSDropdown from "../components/LSDropdown";
import ButtonContained from "../components/ButtonContained";
import Collapsible from "react-native-collapsible";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import AlertModal from "../components/AlertModal";

const LivestockScreen = () => {
  const { setActiveScreen, userData } = useData();
  const { auth } = useAuth();
  const [category, setCategory] = useState(null);
  const [livestock, setLivestock] = useState("");
  const [count, setCount] = useState(0);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setActiveScreen("Livestock");
    }, [])
  );

  useEffect(() => {
    setLivestock("");
    setCount(0);
  }, [category]);

  useEffect(() => {
    setCount(0);
  }, [livestock]);

  const handleAddLivestock = async () => {
    if (!category || !livestock || !count) return;

    setDisabled(true);
    try {
      const response = await axios.post("/livestock", {
        id: auth.id,
        category,
        livestock,
        count,
      });
      setLivestock("");
      setCount(0);
      setSuccessModalShow(true);
    } catch (error) {
      console.log(error);
      setErrorModalShow(true);
    }
    setDisabled(false);
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#007bff",
          marginBottom: 24,
        }}
      >
        Livestock Management
      </Text>

      <LSDropdown
        disabled={disabled}
        label="Category"
        options={["Add Livestock", "Mortality"]}
        placeholder="Select Category:"
        setValue={setCategory}
        value={category}
      />
      {category == null ? null : category == "Add Livestock" ? (
        <>
          <LSDropdown
            disabled={disabled}
            label="Livestock"
            placeholder="Livestock:"
            options={[
              "Cow",
              "Goat",
              "Chicken",
              "Duck",
              "Carabao",
              "Pig",
              "Horse",
            ]}
            setValue={setLivestock}
            value={livestock}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}
          >
            Count:
          </Text>

          <TextInput
            style={{
              fontSize: 16,
              padding: 16,
              letterSpacing: 1,
              width: "100%",
              fontWeight: "600",
              borderWidth: 2,
              borderColor: "#e0e0e0",
            }}
            value={count}
            onChangeText={(v) => setCount(v)}
            placeholder={"Enter count"}
            placeholderTextColor="#e0e0e0"
            inputMode={"decimal"}
            editable={!disabled}
          />
          <View style={{ width: "100%", marginTop: 26 }}>
            <ButtonContained
              disabled={disabled}
              label="Add"
              onPress={handleAddLivestock}
            />
          </View>
        </>
      ) : (
        <>
          <LSDropdown
            disabled={disabled}
            label="Livestock"
            placeholder="Livestock:"
            options={[
              "Cow",
              "Goat",
              "Chicken",
              "Duck",
              "Carabao",
              "Pig",
              "Horse",
            ]}
            setValue={setLivestock}
            value={livestock}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              width: "100%",
              textAlign: "center",
            }}
          >
            Record Lost Count:
          </Text>

          <TextInput
            style={{
              fontSize: 16,
              padding: 16,
              letterSpacing: 1,
              width: "100%",
              fontWeight: "600",
              borderWidth: 2,
              borderColor: "#e0e0e0",
            }}
            value={count}
            onChangeText={(v) => setCount(v)}
            placeholder={"Enter lost count"}
            placeholderTextColor="#e0e0e0"
            inputMode={"decimal"}
            editable={!disabled}
          />
          <View style={{ width: "100%", marginTop: 26 }}>
            <ButtonContained
              disabled={disabled}
              label="Confirm Lost"
              onPress={handleAddLivestock}
            />
          </View>
        </>
      )}

      <AlertModal
        visible={successModalShow}
        onClose={() => setSuccessModalShow(false)}
        content="Your action was completed successfully. Thank you for your effort!"
      />

      <AlertModal
        severity="error"
        visible={errorModalShow}
        onClose={() => setErrorModalShow(false)}
        content="Something went wrong while processing your request. Please try again later or contact support if the issue persists."
      />
    </View>
  );
};

export default LivestockScreen;
