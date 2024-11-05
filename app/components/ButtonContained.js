import { View, Text, Pressable } from "react-native";
import React from "react";

const ButtonContained = ({ onPress, disabled, label }) => {
  return (
    <Pressable
      style={{
        padding: 12,
        borderRadius: 20,
        display: "flex",
        justifyContent: "center",
        backgroundColor: disabled ? "#e0e0e0" : "#007bff",
        marginTop: 8,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          color: "#FFF",
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

export default ButtonContained;
