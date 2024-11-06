import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const RadioButton = ({ setValue, item, value }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.radioButton}
      onPress={() => setValue(item)}
    >
      <View style={styles.circleOutline}>
        <View style={[styles.circle, value === item && styles.checkedCircle]} />
      </View>
      <Text style={styles.radioText}>{item}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  circleOutline: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#777",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 14,
    width: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#777",
  },
  checkedCircle: {
    backgroundColor: "#777",
  },
  radioText: {
    fontSize: 16,
  },
});

export default RadioButton;
