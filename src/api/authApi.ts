import api from "./axios";

type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
}

type SignUpRequest = {
  username: string;
  password: string;
  email: string;
  cpf: string;
}

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/api/auth/login", credentials);
  return data;
};

export const signUpApi = async (newUser: SignUpRequest): Promise<void> => {
  await api.post("/auth/register", newUser);
};