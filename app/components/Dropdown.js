import { View, Text } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";

const Dropdown = ({ setValue, options, label, placeholder, value }) => {
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
        {label}:
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
          value={value}
          onValueChange={setValue}
          items={
            (options &&
              options?.map((item, index) => ({
                key: index,
                label: item,
                value: item,
              }))) ||
            []
          }
          placeholder={{ label: placeholder, value: null }}
          style={{
            inputAndroid: {
              marginBottom: -14,
              marginTop: -16,
              fontWeight: "600",
            },
          }}
        />
      </View>
    </View>
  );
};

export default Dropdown;
