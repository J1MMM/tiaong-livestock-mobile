import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const GenderRadioBtn = ({ handleGenderSelect, selectedGender }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sex:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.radioButton}
          onPress={() => handleGenderSelect("Male")}
        >
          <View style={styles.circleOutline}>
            <View
              style={[
                styles.circle,
                selectedGender === "Male" && styles.checkedCircle,
              ]}
            />
          </View>
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.radioButton}
          onPress={() => handleGenderSelect("Female")}
        >
          <View style={styles.circleOutline}>
            <View
              style={[
                styles.circle,
                selectedGender === "Female" && styles.checkedCircle,
              ]}
            />
          </View>
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
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

export default GenderRadioBtn;
