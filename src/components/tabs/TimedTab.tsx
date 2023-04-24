import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const TimedTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.comingSoonContainer}>
        <Text style={styles.comingSoonText}>Coming Soon</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 10,
  },
  comingSoonContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  comingSoonText: {
    color: "#B0B0B0",
    fontSize: 32,
    fontWeight: "600",
  },
});

export default TimedTab;
