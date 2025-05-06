import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

const apiUrl = "http://127.0.0.1:8000";

interface UseApiRequestResponse<T> {
    response: T | null;
    error: string | null;
    loading: boolean;
    fetchData: (overrideConfig?: AxiosRequestConfig) => Promise<void>;
}

export const useApiRequest = <T = any>(
    initialConfig: AxiosRequestConfig
): UseApiRequestResponse<T> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(
        async (overrideConfig?: AxiosRequestConfig) => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios({
                    baseURL: apiUrl,
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                        ...initialConfig.headers,
                    },
                    ...initialConfig,
                    ...overrideConfig,
                });
                setResponse(res.data);
            } catch (err: any) {
                console.error(err);
                setError(
                    err.response?.data?.message ||
                        "Ocorreu um erro ao carregar os dados."
                );
            } finally {
                setLoading(false);
            }
        },
        [initialConfig]
    );

    return { response, error, loading, fetchData };
};
