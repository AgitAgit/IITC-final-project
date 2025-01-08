import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserByToken, updateUserProfile } from "../services/userService";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserByToken(),
  });
};

//
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
    },
  });
};
