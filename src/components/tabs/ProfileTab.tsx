// components/ProfileTab.tsx
import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import CountryPicker from "../CountryPicker";
import { theme } from "../../styles/theme";
import UserContext from "../../contexts/UserContext";
import { Logout } from "../../utils/api";

const ProfileTab: React.FC = () => {
  const [user, setUser] = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await Logout();
      setUser(undefined);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.selectCountryText}>Select your region</Text>
        <CountryPicker containerStyle={styles.countryPickerContainer} />
      </View>
      {user && (
        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            onPress={handleLogout}
            buttonStyle={styles.logoutButton}
            titleStyle={styles.buttonText}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 5,
  },
  titleContainer: {
    marginBottom: 5,
  },
  title: {
    ...theme.text.subTitle,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.colors.primaryText,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectCountryText: {
    ...theme.text.title,
    fontWeight: "normal",
    fontSize: 17,
    color: theme.colors.primaryText,
    marginBottom: 5,
  },
  countryPickerContainer: {
    marginBottom: 20,
  },
  logoutContainer: {
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    ...theme.text.buttonText,
    fontWeight: "bold",
    color: theme.colors.white,
  },
});

export default ProfileTab;
