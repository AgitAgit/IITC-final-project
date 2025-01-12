import { siteCliant } from "../lib/api";

export const getUserSitesByToken = async (): Promise<any> => {
  try {
    const response = await siteCliant.get("/usersites");
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
