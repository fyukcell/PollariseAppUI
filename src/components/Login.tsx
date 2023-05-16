//components/Login.tsx
import React, { useState, useEffect } from "react";
import { View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import {
  validateLogin,
  requestOtp,
  validateOtp,
  getLastOtpRequestTime,
} from "../utils/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../styles/theme";

interface LoginProps {
  onLogin: () => void;
  onClose: () => void;
}

const phoneNumberRegex = /^(\+\d{1,4})?\s?\d{4,14}$/;

const Login: React.FC<LoginProps> = ({ onLogin, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [buttonTimer, setButtonTimer] = useState(0);

  useEffect(() => {
    checkLoginStatus();
    updateRemainingTime();
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  useEffect(() => {
    if (buttonTimer > 0) {
      const timer = setTimeout(() => {
        setButtonTimer(buttonTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [buttonTimer]);

  const checkLoginStatus = async () => {
    const isLoggedIn = await validateLogin();
    if (isLoggedIn) {
      onLogin();
    }
  };

  const updateRemainingTime = async () => {
    const lastOtpRequestTime = await getLastOtpRequestTime();
    const elapsedTime = Math.floor((Date.now() - lastOtpRequestTime) / 1000);
    const newRemainingTime = elapsedTime < 60 ? 60 - elapsedTime : 0;
    setRemainingTime(newRemainingTime);
  };

  const handleRequestOtp = async () => {
    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert(
        "Error",
        "Invalid phone number format. Please enter a valid phone number."
      );
      return;
    }
    const success = await requestOtp(phoneNumber);
    if (success) {
      setButtonTimer(5);

      setOtpRequested(true);
      Alert.alert(
        "OTP requested",
        "An OTP has been sent to your phone number."
      );
      updateRemainingTime();
    } else {
      setButtonTimer(5);

      Alert.alert("Error", "Unable to request OTP. Please try again later.");
    }
  };

  const handleValidateOtp = async () => {
    const success = await validateOtp(phoneNumber, otp);
    if (success) {
      onLogin();
    } else {
      setButtonTimer(5);

      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Login to Participate</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text>
            <Icon name="close" size={30} color={theme.colors.primaryText} />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />
      <View style={styles.container}>
        {!otpRequested ? (
          <>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              placeholder="Phone number"
              placeholderTextColor="gray"
            />
            <Button
              title={`Request OTP${
                remainingTime > 0 ? ` (${remainingTime}s)` : ""
              }`}
              onPress={handleRequestOtp}
              buttonStyle={[
                styles.button,
                remainingTime > 0 || buttonTimer > 0
                  ? styles.buttonDisabled
                  : null,
              ]}
              titleStyle={styles.buttonTitle}
              disabled={remainingTime > 0 || buttonTimer > 0}
            />
          </>
        ) : (
          <>
            <Text h4 style={styles.subheader}>
              Enter the OTP
            </Text>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              placeholder="OTP"
              placeholderTextColor="gray"
            />
            <Button
              title="Validate OTP"
              onPress={handleValidateOtp}
              buttonStyle={[
                styles.button,
                buttonTimer > 0 ? styles.buttonDisabled : null,
              ]}
              titleStyle={styles.buttonTitle}
              disabled={buttonTimer > 0}
            />
          </>
        )}
        <Text style={styles.disclaimerText}>
          WE ONLY USE YOUR NUMBER FOR VALIDATION. YOUR NUMBER IS ENCRYPTED
          DURING VALIDATION. WE DO NOT ASSOCIATE YOUR NUMBER WITH YOUR
          RESPONSES.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    padding: 20,
    justifyContent: "center",
  },
  closeButton: {
    padding: 6,
  },
  header: {
    color: theme.colors.primaryText,
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily: "BUNGEE",
  },
  topContainer: {
    flexDirection: "row", // Change this line
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: theme.colors.borderColor,
    marginBottom: 20,
  },
  subheader: {
    color: theme.colors.primaryText,
    marginBottom: 10,
    fontFamily: "DEGULAR",
    fontWeight: "500",
  },
  inputContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: theme.colors.primary,
  },
  input: {
    color: theme.colors.primaryText,
    fontFamily: "DEGULAR",
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#A1887F",
  },
  buttonTitle: {
    fontSize: theme.text.buttonText.fontSize,
    fontFamily: "DEGULAR",
  },
  disclaimerText: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    color: theme.colors.secondaryText,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "DEGULAR",
  },
});

export default Login;
