import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";
import PollList from "../PollList";
import Shimmer from "react-native-shimmer";
import { POLL_SCOPE, POLL_CATEGORY, COUNTRY } from "../../utils/constants";
import { theme } from "../../styles/theme";
import { PollFilter } from "../../utils/models";
import { CountryContext } from "../../contexts/CountryContext";

const DailyTab: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { selectedCountry } = useContext(CountryContext); // Use selectedCountry from the context

  const buttons = ["World", "Region"];

  let filters: PollFilter = {
    scope: selectedIndex === 0 ? POLL_SCOPE.WORLD : POLL_SCOPE.COUNTRY,
    type: POLL_CATEGORY.DAILY,
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Shimmer duration={3000} style={styles.shimmer}>
          <Text style={styles.title}>Daily Polls</Text>
        </Shimmer>
        <View style={styles.separator}></View>
      </View>
      <ButtonGroup
        onPress={(index) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.buttonGroupContainer}
        selectedButtonStyle={styles.selectedButton}
        textStyle={styles.buttonText}
        selectedTextStyle={styles.selectedButtonText}
        innerBorderStyle={{ color: "#2F2F2F" }}
      />
      {selectedIndex === 1 && (
        <View>
          <Text style={styles.countryText}>{selectedCountry}</Text>
        </View>
      )}
      <PollList filters={filters} />
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
  countryText: {
    ...theme.text.title,
    fontWeight: "normal",
    fontSize: 17,
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
  buttonGroupContainer: {
    borderColor: theme.colors.separator,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#222222",
    marginBottom: 15,
    height: 35,
    width: 200,
    alignSelf: "center",
  },
  selectedButton: {
    backgroundColor: theme.colors.primary,
    elevation: 4,
  },
  buttonText: {
    color: theme.colors.buttonText,
    ...theme.text.buttonText,
  },
  selectedButtonText: {
    color: theme.colors.white,
    ...theme.text.selectedButtonText,
  },
  innerBorder: {
    color: theme.colors.innerBorder,
  },
  countryPicker: {
    width: 200,
    alignSelf: "center",
    marginBottom: 15,
    color: theme.colors.white,
  },
  dropDownContainer: {
    marginBottom: 15,
  },
  dropDown: {
    backgroundColor: "#222222",
  },
  dropDownItem: {
    justifyContent: "flex-start",
  },
  dropDownBox: {
    backgroundColor: "#222222",
    borderColor: theme.colors.separator,
  },
  countryPickerContainer: {
    alignSelf: "center",
    marginBottom: 15,
  },
});

export default DailyTab;
