import instance from "../lib/axios";
import {
  type User,
  type LoginPayload,
  type TokenResponse,
  type Register,
} from "../types/auth";

const registerUser = (data: Register) =>
  instance.post<TokenResponse>("register/", {
    full_name: data.fullName,
    email: data.email,
    password: data.password,
  });

const loginUser = (data: LoginPayload) =>
  instance.post<TokenResponse>("login/", data);

const logoutUser = () => instance.post<void>("logout/");

const refreshAuth = () => instance.post<TokenResponse>("refresh/");

const getCurrentUser = () => instance.get<User>("me/");

export { loginUser, logoutUser, refreshAuth, getCurrentUser, registerUser };
