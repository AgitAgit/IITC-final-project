import { siteClient } from "../lib/api";
import { ApiResponse } from "../types/generalTypes";
import { ISite } from "../types/siteTypes";

export const createSite = async (
  siteData: Site
): Promise<ApiResponse<Site>> => {
  try {
    const response = await siteClient.post<ApiResponse<Site>>(
      "/create",
      siteData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating site:", error);
    throw error;
  }
};

export const fetchAllSites = async (): Promise<ApiResponse<ISite[]>> => {
  try {
    const response = await siteClient.get<ApiResponse<Site[]>>("/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all sites:", error);
    throw error;
  }
};

export const fetchSiteById = async (
  siteId: string
): Promise<ApiResponse<Site>> => {
  try {
    const response = await siteClient.get<ApiResponse<Site>>(`/find/${siteId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching site by ID:", error);
    throw error;
  }
};

export const fetchUserSites = async (): Promise<ApiResponse<ISite[]>> => {
  try {
    const response = await siteClient.get<ApiResponse<Site[]>>("/user-sites");
    return response.data;
  } catch (error) {
    console.error("Error fetching user sites:", error);
    throw error;
  }
};

export const updateSite = async (
  siteId: string,
  updatedData: Partial<Site>
): Promise<ApiResponse<Site>> => {
  try {
    const response = await siteClient.put<ApiResponse<Site>>(
      `/update/${siteId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating site:", error);
    throw error;
  }
};

export const deleteSite = async (
  siteId: string
): Promise<ApiResponse<{ message: string }>> => {
  try {
    const response = await siteClient.delete<ApiResponse<{ message: string }>>(
      `/delete/${siteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting site:", error);
    throw error;
  }
};
