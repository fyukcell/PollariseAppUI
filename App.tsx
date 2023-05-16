// App.tsx
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import NavigationBar from "./src/components/NavigationBar";
import AppHeader from "./src/components/AppHeader";
import { theme } from "./src/styles/theme";
import { CountryProvider } from "./src/contexts/CountryContext";
import { UserProvider } from "./src/contexts/UserContext";
import UserContext from "./src/contexts/UserContext";
import LoadingPage from "./src/LoadingPage";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  const [, , initializing] = useContext(UserContext);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!initializing) {
      setTimeout(() => {
        setShowLoading(false);
      }, 3000);
    }
  }, [initializing]);

  if (showLoading || initializing) {
    return <LoadingPage />;
  }

  return (
    <UserProvider>
      <CountryProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={styles.safeArea}>
            <NavigationContainer>
              <View style={styles.container}>
                <AppHeader />
                <NavigationBar />
              </View>
            </NavigationContainer>
          </SafeAreaView>
        </ThemeProvider>
      </CountryProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#EFEFEF",
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default App;
