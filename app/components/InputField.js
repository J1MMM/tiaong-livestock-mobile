import { View, Text, TextInput } from "react-native";
import React from "react";
import TextLabel from "./TextLabel";

const InputField = ({
  inputMode,
  label,
  onChangeText,
  disabled,
  value,
  errMsg,
  style,
  autoComplete,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          gap: 8,
        },
        style,
      ]}
    >
      <TextLabel>{label}:</TextLabel>

      <TextInput
        style={{
          fontSize: 16,
          letterSpacing: 1,
          flex: 1,
          width: "100%",
          borderBottomWidth: 2,
          borderColor: errMsg ? "#FC0F3B" : "#e0e0e0",
          padding: 0,
        }}
        onChangeText={onChangeText}
        editable={!disabled}
        value={value}
        inputMode={inputMode || "text"}
        autoComplete={autoComplete || "off"}
      />
    </View>
  );
};

export default InputField;
