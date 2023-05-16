// Src/Components/ProfileTab.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const ProfileTab: React.FC = () => {
  const handleLogout = async () => {
    try {
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileTab;
