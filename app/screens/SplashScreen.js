import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

const Splash = ({ setIsLoading }) => {
  useEffect(() => {
    setIsLoading(false);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.loading}>Loading Please Wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#91CBF9",
  },
  title: {
    fontFamily: "bold",
    fontSize: 45,
    letterSpacing: 2,
    color: "#3d3d59",
  },
  subTitle: {
    fontFamily: "bold",
    color: "#3d3d59",
    letterSpacing: 1,
    marginTop: -4,
  },
  loading: {
    color: "#3d3d59",
    fontFamily: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Splash;
