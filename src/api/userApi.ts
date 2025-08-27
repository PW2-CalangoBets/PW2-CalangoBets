import api from "./axios";

type UserResponse = {
    name: string;
    email: string;
    cdb: number;
    totalDeposit: number;
    wins: number;
    looses: number;
}

// Infelizmente só tem o nome pra atualizar de relevante na minha api mixuruca :(
type UserUpdateRequest = {
    name: string;
}

export const getUserInfoApi = async (): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/api/users");
    return data;
};

export const updateUser = async (updatedInfo: UserUpdateRequest): Promise<void> => {
    await api.patch("/api/users", updatedInfo);
}