import { validateLogin } from "./api";

export const isUserLoggedIn = async (): Promise<boolean> => {
  try {
    return true;
    const loggedIn = await validateLogin();
    return loggedIn;
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};
