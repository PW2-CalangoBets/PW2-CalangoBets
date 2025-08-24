import api from "./axios";

type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
}

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/api/auth/login", credentials);
  return data;
};