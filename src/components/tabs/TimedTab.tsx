// Src/Components/Tabs/DailyTab.tsx
import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ButtonGroup } from "react-native-elements";
import PollList from "../PollList";
import { POLL_SCOPE, POLL_CATEGORY } from "../../utils/constants";
import { theme } from "../../styles/theme";
import { PollFilter } from "../../utils/models";
import { CountryContext } from "../../contexts/CountryContext";

const TimedTab: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { selectedCountry } = useContext(CountryContext);

  const buttons = ["World", "Region"];

  let filters: PollFilter = {
    scope: selectedIndex === 0 ? POLL_SCOPE.WORLD : POLL_SCOPE.COUNTRY,
    type: POLL_CATEGORY.TIMED,
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timed Polls</Text>
      </View>
      {selectedIndex === 0 && (
        <View>
          <Text style={styles.countryText}>World</Text>
        </View>
      )}
      {selectedIndex === 1 && (
        <View>
          <Text style={styles.countryText}>{selectedCountry}</Text>
        </View>
      )}
      <PollList filters={filters} />

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
  countryText: {
    ...theme.text.title,
    fontWeight: "normal",
    fontSize: 17,
    color: theme.colors.primaryText,
  },
  buttonGroupContainer: {
    borderColor: theme.colors.borderColor,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: theme.colors.containerBackground,
    marginBottom: 15,
    height: 35,
    width: 200,
    alignSelf: "center",
  },
  selectedButton: {
    backgroundColor: theme.colors.accent,
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
});

export default TimedTab;
