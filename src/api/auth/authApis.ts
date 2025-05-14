import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, login, register } from "./auth.rq";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};
