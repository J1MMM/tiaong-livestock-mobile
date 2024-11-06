import { View, Text } from "react-native";
import React from "react";

const TextLabel = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontWeight: "bold",
          fontSize: 16,
          maxWidth: 150,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextLabel;
