import { View, Text, TextInput } from "react-native";
import React from "react";

const InputField = ({ label, onChangeText, disabled, value }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {label}:
      </Text>
      <TextInput
        style={{
          fontSize: 16,
          letterSpacing: 1,
          flex: 1,
          width: "100%",
          fontWeight: "500",
          borderBottomWidth: 2,
          borderColor: "#e0e0e0",
          padding: 0,
        }}
        onChangeText={onChangeText}
        editable={!disabled}
        value={value}
      />
    </View>
  );
};

export default InputField;
