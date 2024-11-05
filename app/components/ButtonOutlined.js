import { View, Text, Pressable } from "react-native";
import React from "react";

const ButtonOutlined = ({ onPress, disabled, label }) => {
  return (
    <Pressable
      style={{
        padding: 12,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: disabled ? "#e0e0e0" : "#007bff",
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          color: disabled ? "#e0e0e0" : "#007bff",
          fontSize: 16,
          fontWeight: "700",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default ButtonOutlined;
