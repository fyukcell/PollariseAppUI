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
          icon: () => (
            <SvgUri
              width="20"
              height="20"
              uri={`https://flagcdn.com/20x15/${country.toLowerCase()}.svg`}
            />
          ),
        }))}
        style={{
          inputIOS: {
            color: theme.colors.white,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            marginVertical: 10,
            width: 180,
          },
          inputAndroid: {
            color: theme.colors.white,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            marginVertical: 10,
            width: 180,
          },
          iconContainer: {
            top: 8,
            right: 20,
          },
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export default CountryPicker;
