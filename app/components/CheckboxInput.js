import { View, Text } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import TextLabel from "./TextLabel";

const CheckboxInput = ({ value, onValueChange, label }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        color={value ? "#007bff" : undefined}
      />
      <TextLabel style={{ maxWidth: "none" }}>{label}</TextLabel>
    </View>
  );
};

export default CheckboxInput;
