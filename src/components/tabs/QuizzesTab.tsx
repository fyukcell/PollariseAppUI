// Src/Components/Tabs/QuizzesTab.tsx

import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { theme } from "../../styles/theme";

const QuizzesTab: React.FC = () => {
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
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: 10,
  },
  comingSoonContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  comingSoonText: {
    color: theme.colors.primaryText,
    fontSize: 32,
    fontWeight: "600",
  },
});

export default QuizzesTab;
