import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";
import TrendingTab from "./tabs/TrendingTab";
import DailyTab from "./tabs/DailyTab";
import TimedTab from "./tabs/TimedTab";
import QuizzesTab from "./tabs/QuizzesTab";
import ProfileTab from "./tabs/ProfileTab";
import { Icon, Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import PollScreen from "./PollScreen";
import { theme } from "../styles/theme";

const Tab = createBottomTabNavigator();

const NavigationBar: React.FC = () => {
  return (
    <NavigationContainer>
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
                style={[
                  styles.tabLabel,
                  focused ? styles.tabLabelActive : null,
                ]}
              >
                {route.name}
              </Text>
            );
          },
          tabBarActiveTintColor: "#7C3AED",
          tabBarInactiveTintColor: "#B5B5B5",
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Trending" component={TrendingTab} />
        <Tab.Screen name="Daily" component={DailyTab} />
        <Tab.Screen name="Timed" component={TimedTab} />
        <Tab.Screen name="Quizzes" component={QuizzesTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.headerBackground,
    borderTopWidth: 1, // Change this to 1 for a border at the top
    borderTopColor: theme.colors.lightBorder, // Add this line to set the border color
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
  },
  tabLabel: {
    fontSize: theme.text.buttonText.fontSize,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 5,
    color: theme.colors.buttonText,
  },
  tabLabelActive: {
    color: theme.colors.tertiaryText,
    fontWeight: theme.text.selectedButtonText.fontWeight,
  },
  tabIcon: {
    marginBottom: 5,
  },
  tabIconActive: {},
});

export default NavigationBar;
