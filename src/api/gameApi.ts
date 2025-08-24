import api from "./axios";

export type GameHistory = {
  id: string;
  playerId: string;
  gameName: string;
  date: string; // LocalDateTime no backend -> string ISO
  accountCdb: number; // saldo antes da partida
  cdb: number;        // valor apostado
  result: "WIN" | "LOSE";
};

export type PaginatedResponse<T> = {
    content: T[];
    first: boolean;
    last: boolean;
    size: number;
    totalPages: number;
    totalElements: number;
    page: number;
    pageElementsAmount: number;
};

type GetAllGamesParams = {
    page?: number;
    size?: number;
};

export const getAllGamesApi = async (params: GetAllGamesParams = {}): Promise<PaginatedResponse<GameHistory>> => {
    const { data } = await api.get<PaginatedResponse<GameHistory>>("/api/game", {
        params, 
    });

    return data;
};