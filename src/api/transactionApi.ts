import api from "./axios";

export type TransactionRequest = {
    operation: "DEPOSIT" | "WITHDRAW";
    value: number;
};

export type TransactionResponse = {
    id: string;
    operation: string;
    value: number;
    accountCdb: number;
    date: string;
};

export const createTransactionApi = async (
    transaction: TransactionRequest
): Promise<TransactionResponse> => {
    const { data } = await api.post<TransactionResponse>("/api/transaction", transaction);
    return data;
};

export const getTransactionsApi = async (): Promise<TransactionResponse[]> => {
    const { data } = await api.get("/api/transaction");
    // Ajuste para retornar um array se o backend retornar um objeto paginado
    return data.content || data;
};