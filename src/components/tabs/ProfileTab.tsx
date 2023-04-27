import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COUNTRY } from "../../utils/constants";
import CountryPicker from "../CountryPicker";
import { theme } from "../../styles/theme";
import Shimmer from "react-native-shimmer";

const ProfileTab: React.FC = () => {
  const handleLogout = async () => {
    try {
      // Implement your logout functionality here
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Shimmer duration={3000} style={styles.shimmer}>
          <Text style={styles.title}>Profile</Text>
        </Shimmer>
        <View style={styles.separator}></View>
      </View>
      <View style={styles.content}>
        <Text style={styles.selectCountryText}>Select your country</Text>
        <CountryPicker containerStyle={styles.countryPickerContainer} />
      </View>
      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          buttonStyle={styles.logoutButton}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
    backgroundColor: "#0D0D0D",
  },
  shimmer: {
    width: 200,
    height: 40,
    color: "#6A5ACD",
  },
  title: {
    ...theme.text.title,
    color: theme.colors.white,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.separator,
    marginTop: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  selectCountryText: {
    ...theme.text.title,
    fontWeight: "normal",
    fontSize: 17,
    color: theme.colors.white,
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    alignSelf: "center",
    marginBottom: 5,
  },
  countryPickerContainer: {
    marginBottom: 20,
    alignSelf: "center",
  },
  logoutContainer: {
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: theme.colors.primary,
    elevation: 4,
    width: 150,
    alignSelf: "center",
  },
  buttonText: {
    color: theme.colors.white,
    ...theme.text.buttonText,
  },
});

export default ProfileTab;
