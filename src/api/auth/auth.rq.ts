import request from "../request";

export const login = async () => await request.post(` /users/login/`, {});
export const register = async () => await request.post(`/users`, {});
