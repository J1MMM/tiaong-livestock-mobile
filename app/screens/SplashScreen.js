import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
const Splash = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#007bff" size={50} />
      <Text style={styles.loading}>Loading Please Wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    gap: 24,
  },

  loading: {
    color: "#007bff",
    fontFamily: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Splash;
