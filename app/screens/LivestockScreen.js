import { View, Text, TextInput } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import useData from "../hooks/useData";
import { useFocusEffect } from "@react-navigation/native";
import Dropdown from "../components/Dropdown";
import RNPickerSelect from "react-native-picker-select";
import LSDropdown from "../components/LSDropdown";
import ButtonContained from "../components/ButtonContained";
import Collapsible from "react-native-collapsible";
import axios from "../api/axios";

const LivestockScreen = () => {
  const { setActiveScreen } = useData();
  const [category, setCategory] = useState(null);
  const [livestock, setLivestock] = useState("");
  const [count, setCount] = useState(0);
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

  const handleAddLivestock = async () => {
    setDisabled(true);
    try {
      const response = await axios.post("/livestock", {
        category,
        livestock,
        count,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
        label="Category"
        options={["Add Livestock", "Mortality"]}
        placeholder="Select Category:"
        setValue={setCategory}
        value={category}
      />
      {category == null ? null : category == "Add Livestock" ? (
        <>
          <LSDropdown
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
            <ButtonContained disabled={disabled} label="Confirm Lost" />
          </View>
        </>
      )}
    </View>
  );
};

export default LivestockScreen;
