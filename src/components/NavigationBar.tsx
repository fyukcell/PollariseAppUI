// Src/Components/NavigationBar.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyTab from "./tabs/DailyTab";
import TimedTab from "./tabs/TimedTab";
import QuizzesTab from "./tabs/QuizzesTab";
import ProfileTab from "./tabs/ProfileTab";
import { Icon, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { theme } from "../styles/theme";
import { color } from "@rneui/base";

const Tab = createBottomTabNavigator();

const NavigationBar: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Trending") {
            iconName = focused ? "flame" : "flame-outline";
          } else if (route.name === "Daily") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Timed") {
            iconName = focused ? "timer" : "timer-outline";
          } else if (route.name === "Quizzes") {
            iconName = focused ? "help-circle" : "help-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Icon
              type="ionicon"
              name={iconName}
              size={size}
              color={focused ? theme.colors.secondary : theme.colors.white}
              containerStyle={styles.tabIcon}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => {
          return (
            <Text
              style={[styles.tabLabel, focused ? styles.tabLabelActive : null]}
            >
              {route.name}
            </Text>
          );
        },
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Daily" component={DailyTab} />
      <Tab.Screen name="Timed" component={TimedTab} />
      <Tab.Screen name="Quizzes" component={QuizzesTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: theme.colors.navbarBackground,
  },
  tabBar: {
    backgroundColor: theme.colors.navbarBackground,
    borderTopWidth: 1, // Changed to 1 for a border at the top
    borderTopColor: theme.colors.background, // Set the border color
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    borderColor: theme.colors.background,
    borderWidth: 5,
    borderRadius: 20,
  },
  tabLabel: {
    fontSize: theme.text.buttonText.fontSize,
    textAlign: "center",
    marginTop: 2,
    color: theme.colors.tabBarInactiveTintColor,
    fontFamily: "DEGULAR", // Added font family
  },
  tabLabelActive: {
    color: theme.colors.accent,
    fontWeight: theme.text.selectedButtonText.fontWeight,
    fontFamily: "DEGULAR", // Added font family
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabIconActive: {},
});

export default NavigationBar;
