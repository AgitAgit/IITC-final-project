import { usersCliant } from "../lib/api";
import { InitialUpdateUser } from "../components/EditUser/EditProfile";

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

export const getUserByToken = async (): Promise<any> => {
  try {
    const response = await usersCliant.get("/getuserbyid");
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const updateUserProfile = async ({
  updateData,
  id,
}: {
  updateData: Partial<InitialUpdateUser>;
  id: string;
}) => {
  try {
    console.log(updateData);
    console.log(id);

    const response = await usersCliant.put(`/updateUser/${id}`, updateData);
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const deleteProfile = async (id: string) => {
  try {
    console.log(id);

    const response = await usersCliant.delete(`/deleteUser/${id}`);
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
