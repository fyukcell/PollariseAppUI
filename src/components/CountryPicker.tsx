// Src/Components/CountryPicker.tsx
import React, { useContext } from "react";
import RNPickerSelect from "react-native-picker-select";
import { SvgUri } from "react-native-svg";
import { COUNTRY } from "../utils/constants";
import { theme } from "../styles/theme";
import { StyleProp, View, ViewStyle } from "react-native";
import { CountryContext } from "../contexts/CountryContext";

type CountryPickerProps = {};

const CountryPicker: React.FC<
  CountryPickerProps & { containerStyle?: StyleProp<ViewStyle> }
> = ({ containerStyle }) => {
  const { selectedCountry, setSelectedCountry } = useContext(CountryContext);

  const handleCountryChange = (country: COUNTRY) => {
    setSelectedCountry(country);
  };

  return (
    <View style={containerStyle}>
      <RNPickerSelect
        value={selectedCountry}
        onValueChange={handleCountryChange}
        items={Object.values(COUNTRY).map((country) => ({
          label: country,
          value: country,
        }))}
        style={{
          inputIOS: {
            ...theme.text.input,
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            backgroundColor: theme.colors.containerBackground,
            borderColor: theme.colors.borderColor,
            borderWidth: 2,
            marginVertical: 10,
            justifyContent: "center",
            width: 180,
            textAlign: "center", // Add this line
          },
          inputAndroid: {
            ...theme.text.input,
            justifyContent: "center",
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            backgroundColor: theme.colors.containerBackground,
            borderColor: theme.colors.borderColor,
            borderWidth: 2,
            marginVertical: 10,
            width: 180,
            textAlign: "center", // Add this line
          },
          iconContainer: {
            top: 10,
            right: 15,
          },
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export default CountryPicker;
