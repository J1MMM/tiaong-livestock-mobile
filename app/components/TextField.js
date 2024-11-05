import { View, Text, TextInput } from "react-native";
import React from "react";

const TextField = ({
  errMsg,
  onChangeText,
  value,
  disabled,
  placeholder,
  type,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#888",
        borderRadius: 20,
        backgroundColor: "#FFF",
        paddingHorizontal: 12,
        width: "100%",
        borderColor: errMsg ? "#FC0F3B" : "#e0e0e0",
      }}
    >
      <TextInput
        style={{
          fontSize: 16,
          padding: 16,
          letterSpacing: 1,
          flex: 1,
          width: "100%",
          fontWeight: "600",
        }}
        placeholder={placeholder}
        placeholderTextColor="#888"
        onChangeText={onChangeText}
        value={value}
        inputMode={type || "text"}
        editable={!disabled}
      />
    </View>
  );
};

export default TextField;
