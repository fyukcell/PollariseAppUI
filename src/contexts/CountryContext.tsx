// Src/Contexts/CountryContext.tsx
import React, { createContext, useState } from "react";
import { COUNTRY } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CountryContext = createContext<{
  selectedCountry: COUNTRY;
  setSelectedCountry: React.Dispatch<React.SetStateAction<COUNTRY>>;
  updateCountryContext: () => void;
}>({
  selectedCountry: COUNTRY.UNITED_STATES,
  setSelectedCountry: () => {},
  updateCountryContext: () => {},
});

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<COUNTRY>(
    COUNTRY.UNITED_STATES
  );

  const updateCountryContext = async () => {
    try {
      const storedCountry = await AsyncStorage.getItem("selectedCountry");
      if (storedCountry !== null) {
        setSelectedCountry(storedCountry as COUNTRY);
      } else {
        setSelectedCountry(COUNTRY.UNITED_STATES);
      }
    } catch (error) {
      console.error("Error fetching selected country:", error);
    }
  };

  return (
    <CountryContext.Provider
      value={{ selectedCountry, setSelectedCountry, updateCountryContext }}
    >
      {children}
    </CountryContext.Provider>
  );
};
