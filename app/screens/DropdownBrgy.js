import { View, Text } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { BRGY } from "../utils/constant";

const DropdownBrgy = ({ setUserData }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        Barangay:
      </Text>
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: "#e0e0e0",
          flex: 1,
          marginLeft: 8,
        }}
      >
        <RNPickerSelect
          onValueChange={(value) =>
            setUserData((prev) => ({ ...prev, barangay: value }))
          }
          items={BRGY.map((brgy) => ({ label: brgy, value: brgy }))}
          placeholder={{ label: "Select your Barangay:", value: null }}
          style={{
            inputAndroid: {
              marginBottom: -8,
              marginTop: -16,
            },
          }}
        />
      </View>
    </View>
  );
};

export default DropdownBrgy;
