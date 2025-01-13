import { useQuery } from "@tanstack/react-query";
import { getUserSitesByToken } from "../services/siteService";

export const useUserSites = () => {
  return useQuery({
    queryKey: ["userSites"],
    queryFn: () => getUserSitesByToken(),
  });
};
