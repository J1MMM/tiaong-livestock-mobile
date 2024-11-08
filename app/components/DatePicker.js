import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import TextLabel from "./TextLabel";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DatePicker = ({ setDate, date, label }) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const dateNow = new Date();

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 8,
      }}
    >
      <TextLabel>{label}:</TextLabel>

      <Pressable
        onPress={showDatepicker}
        style={{
          flex: 1,
          borderBottomWidth: 2,
          borderColor: "#e0e0e0",
          flexDirection: "row",
          alignItems: "centerW",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            marginTop: 4,
            marginLeft: 8,
          }}
        >
          {date
            ? date.toLocaleDateString("en-GB") ==
              dateNow.toLocaleDateString("en-GB")
              ? ""
              : date.toLocaleDateString("en-GB")
            : ""}
        </Text>
        <Ionicons
          name="calendar-clear-sharp"
          size={24}
          color="#e0e0e0"
          style={{ marginRight: 8 }}
        />
      </Pressable>
    </View>
  );
};

export default DatePicker;
