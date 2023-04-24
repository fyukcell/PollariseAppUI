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
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text>
          <Icon name="close" size={30} color="#FFF" />
        </Text>
      </TouchableOpacity>
      <Text h3 style={styles.header}>
        Login to Participate
      </Text>
      <View style={styles.divider} />
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
        WE ONLY USE YOUR NUMBER FOR VALIDATION. YOUR NUMBER IS ENCRYPTED DURING
        VALIDATION. WE DO NOT ASSOCIATE YOUR NUMBER WITH YOUR RESPONSES.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  header: {
    color: theme.colors.white,
    fontSize: theme.text.title.fontSize,
    fontWeight: theme.text.title.fontWeight,
    marginBottom: 5,
    fontFamily: "Roboto",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.separator,
    marginBottom: 50,
    marginTop: 0,
  },
  subheader: {
    color: theme.colors.white,
    marginBottom: 10,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  inputContainer: {
    width: "80%",
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: theme.colors.primary,
  },
  input: {
    color: theme.colors.white,
    fontFamily: "Roboto",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
  },
  buttonDisabled: {
    backgroundColor: "#A1887F",
  },
  buttonTitle: {
    fontSize: theme.text.buttonText.fontSize,
  },
  disclaimerText: {
    position: "absolute",
    width: 300,
    bottom: 20,
    color: theme.colors.white,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Login;
