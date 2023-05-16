// Src/utils/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Poll, Option, User } from "./models";
import { LAST_OTP_REQUEST_TIME } from "./constants";
import DeviceInfo from "react-native-device-info";
import { NativeModules } from "react-native";
import { RSA } from "react-native-rsa-native";
import { sampleData } from "./sample_data";

async function createApiInstance() {
  const uniqueId = await DeviceInfo.getUniqueId();
  const model = DeviceInfo.getModel();
  const systemName = DeviceInfo.getSystemName();
  const systemVersion = DeviceInfo.getSystemVersion();
  const manufacturer = await DeviceInfo.getManufacturer();
  const isEmulator = await isRealDevice();

  if (isEmulator) {
    console.error("Error: Running on an emulator is not allowed");
    throw new Error("Running on an emulator is not allowed");
  }

  return axios.create({
    baseURL: "YOUR_BACKEND_BASE_URL", // Replace with your backend base URL
    headers: {
      "X-Device-Identifier": uniqueId,
      "X-Device-Model": model,
      "X-Device-System-Name": systemName,
      "X-Device-System-Version": systemVersion,
      "X-Device-Manufacturer": manufacturer,
    },
  });
}

async function getPublicKey(): Promise<string> {
  try {
    let api = await createApiInstance();

    const response = await api.get("/public-key");
    return response.data.publicKey;
  } catch (error) {
    console.error("Error getting public key:", error);
    throw error;
  }
}

export const getFilteredPolls = async (type: string): Promise<Poll[]> => {
  try {
    return sampleData.polls;
    const token = await AsyncStorage.getItem("pollarise-jwtToken");
    let api = await createApiInstance();

    const response = await api.get(`/polls?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting filtered polls:", error);
    throw error;
  }
};

export const getPoll = async (pollId: string): Promise<Poll> => {
  try {
    const token = await AsyncStorage.getItem("pollarise-jwtToken");
    let api = await createApiInstance();

    const response = await api.get(`/polls/${pollId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error getting poll with id ${pollId}:`, error);
    throw error;
  }
};

export const submitPoll = async (
  poll: Poll,
  selectedOptions: Option[]
): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("pollarise-jwtToken");
    let api = await createApiInstance();

    const response = await api.post(
      `/polls/${poll.id}/submit`,
      { selectedOptions },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error submitting poll with id ${poll.id}:`, error);
    throw error;
  }
};

export const validateLogin = async (): Promise<User | undefined> => {
  try {
    return sampleData.user;
    const token = await AsyncStorage.getItem("pollarise-jwtToken");
    let api = await createApiInstance();

    if (!token) {
      return undefined;
    }

    const response = await api.post(
      "/validate-login",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error validating login:", error);
    throw error;
  }
};

export const Logout = async (): Promise<User | undefined> => {
  try {
    const token = await AsyncStorage.getItem("pollarise-jwtToken");
    let api = await createApiInstance();

    if (!token) {
      return undefined;
    }

    const response = await api.post(
      "/logout",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error validating login:", error);
    throw error;
  }
};

export const requestOtp = async (phoneNumber: string): Promise<boolean> => {
  try {
    const currentTime = Date.now();
    const lastOtpRequestTime = await getLastOtpRequestTime();
    let api = await createApiInstance();

    const otpRequestInterval = Math.max(
      Math.min(60000, 2 * (currentTime - lastOtpRequestTime)),
      30000
    );

    if (currentTime - lastOtpRequestTime < otpRequestInterval) {
      return false;
    }

    const publicKey = await getPublicKey();
    const encryptedPhoneNumber = await RSA.encrypt(phoneNumber, publicKey);

    const response = await api.post("/request-otp", { encryptedPhoneNumber });
    await setLastOtpRequestTime(currentTime);
    return response.data.success;
  } catch (error) {
    console.error("Error requesting OTP:", error);
    throw error;
  }
};

export const validateOtp = async (
  phoneNumber: string,
  otp: string
): Promise<boolean> => {
  try {
    const currentTime = Date.now();
    const lastOtpRequestTime = await getLastOtpRequestTime();
    let api = await createApiInstance();

    const otpValidationInterval = Math.max(
      Math.min(60000, 2 * (currentTime - lastOtpRequestTime)),
      30000
    );

    if (currentTime - lastOtpRequestTime < otpValidationInterval) {
      return false;
    }

    const publicKey = await getPublicKey();
    const encryptedPhoneNumber = await RSA.encrypt(phoneNumber, publicKey);

    const response = await api.post("/validate-otp", {
      encryptedPhoneNumber,
      otp,
    });
    const token = response.data.token;
    if (token) {
      await AsyncStorage.setItem("pollarise-jwtToken", token);
      await setLastOtpRequestTime(currentTime);
      return true;
    }
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }

  return false;
};

export const getLastOtpRequestTime = async (): Promise<number> => {
  const lastOtpRequestTimeStr = await AsyncStorage.getItem(
    LAST_OTP_REQUEST_TIME
  );
  return lastOtpRequestTimeStr ? parseInt(lastOtpRequestTimeStr) : 0;
};

const setLastOtpRequestTime = async (time: number): Promise<void> => {
  await AsyncStorage.setItem(LAST_OTP_REQUEST_TIME, time.toString());
};

async function isRealDevice(): Promise<boolean> {
  if (__DEV__) {
    return true; // Exclude local debugging
  }

  const isEmulator = await DeviceInfo.isEmulator();
  const isSimulator =
    NativeModules.PlatformConstants?.model.includes("Simulator");

  return !(isEmulator || isSimulator);
}
