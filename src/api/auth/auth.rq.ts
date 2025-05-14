import request from "../request";
import {
  LoginCredentials,
  RegisterCredentials,
  UserResponse,
} from "./auth.types";

export const login = async (params: LoginCredentials) =>
  await request.post(`/users/login`, params);

export const register = async (params: RegisterCredentials) =>
  await request.post(`/users`, params);

export const getCurrentUser = async (): Promise<UserResponse> =>
  await request.get("/user");
