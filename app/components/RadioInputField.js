import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TextLabel from "./TextLabel";
import RadioButton from "./RadioButton";

const RadioInputField = ({ setValue, value, label, options }) => {
  return (
    <View style={styles.container}>
      <TextLabel>{label}:</TextLabel>
      <View style={styles.radioContainer}>
        {options &&
          options?.map((item, index) => (
            <RadioButton
              key={index}
              item={item}
              value={value}
              setValue={setValue}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default RadioInputField;
