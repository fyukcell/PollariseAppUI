import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Shimmer from "react-native-shimmer";
import { theme } from "../styles/theme";

const AppHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Shimmer duration={5000} animating={true} style={styles.shimmer}>
          <Text style={styles.appName}>Pollarise</Text>
        </Shimmer>
        <View style={styles.separator}></View>
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={require("../assets/icon_black.png")}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    marginTop: 20,
    marginLeft: 25,
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: 52,
    height: 52,
  },
  shimmer: {
    width: 250,
    height: 40,
    color: "#6A5ACD",
  },
  appName: {
    ...theme.text.title,
    color: theme.colors.primaryText,
    textAlign: "left",
    textShadowColor: theme.colors.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  separator: {
    height: 1.5,
    width: "35%",
    marginLeft: 5,
    marginTop: 10,
    backgroundColor: theme.colors.separator,
  },
});

export default AppHeader;
