import api from "./axios";

type LoginRequest = {
    email: string;
    password: string;
}

type LoginResponse = {
    token: string;
}

type SignUpRequest = {
    name: string;
    email: string;
    password: string;
}

export const loginApi = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/api/auth/login", credentials);
    return data;
};

export const signUpApi = async (newUser: SignUpRequest): Promise<void> => {
    await api.post("/api/auth/register", newUser);
};