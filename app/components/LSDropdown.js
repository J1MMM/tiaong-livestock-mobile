import React from "react";
import { Dimensions, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
const ScreenWidth = Dimensions.get("window").width;

function LSDropdown({
  label,
  options,
  value,
  setValue,
  placeholder,
  disabled,
}) {
  return (
    <View
      style={{
        width: ScreenWidth - 48,
        gap: 8,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          width: "100%",
          textAlign: "center",
        }}
      >
        {label}:
      </Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: "#e0e0e0",
          paddingVertical: 16,
        }}
      >
        <RNPickerSelect
          disabled={disabled}
          value={value}
          onValueChange={(e) => setValue(e)}
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
}

export default LSDropdown;
