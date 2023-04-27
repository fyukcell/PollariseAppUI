import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { ThemeProvider } from "styled-components/native";
import NavigationBar from "./src/components/NavigationBar";
import { theme } from "./src/styles/theme";
import { CountryProvider } from "./src/contexts/CountryContext";

const App = () => {
  return (
    <CountryProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.appName}>Pollarise</Text>
          </View>
          {<NavigationBar />}
        </SafeAreaView>
      </ThemeProvider>
    </CountryProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#4B0082",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
});

export default App;
