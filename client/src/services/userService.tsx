import { usersCliant } from "../lib/api";

export const signUpService = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await usersCliant.post("/signup", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export const loginService = async (credentials: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await usersCliant.post("/login", credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
