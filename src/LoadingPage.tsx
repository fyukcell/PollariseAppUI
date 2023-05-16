// Src/LoadingPage.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { theme } from "./styles/theme";

const LoadingPage: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <View style={styles.content}>
        <Text style={styles.appName}>Pollarise</Text>
      </View>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 32,
    fontFamily: theme.text.title.fontFamily, // Use BUNGEE font
    color: theme.colors.primaryText, // Use primary text color
    letterSpacing: 1,
  },
  spinner: {
    marginTop: 20,
  },
});

export default LoadingPage;
