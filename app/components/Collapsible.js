import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useRef, useState, useEffect } from "react";

const CollapsibleField = ({ children, collapsed, style }) => {
  const [contentHeight, setContentHeight] = useState(0); // Measured content height
  const animatedHeight = useRef(new Animated.Value(0)).current; // Animated height

  useEffect(() => {
    // Animate height based on collapsed state
    Animated.timing(animatedHeight, {
      toValue: collapsed ? 0 : contentHeight,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [collapsed, contentHeight]);

  // Measure content height on initial render
  const handleLayout = (event) => {
    if (contentHeight === 0) {
      setContentHeight(event.nativeEvent.layout.height);
    }
  };

  return (
    <Animated.View
      style={[style, { height: animatedHeight, overflow: "hidden" }]}
    >
      <View onLayout={handleLayout} style={styles.contentContainer}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // Optional styling for content container
    flex: 1,
  },
});

export default CollapsibleField;
