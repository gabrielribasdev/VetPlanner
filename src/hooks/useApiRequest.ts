// /hooks/useApiRequest.ts

import { useState, useCallback } from "react";
import axios from "axios";

const apiUrl = "https://api.exemplo.com"; // Sua URL base da API

interface UseApiRequestProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
}

interface UseApiRequestResponse<T> {
  response: T | null;
  error: string | null;
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const useApiRequest = <T>({
  method,
  url,
  data,
}: UseApiRequestProps): UseApiRequestResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Limpa o erro ao tentar novamente
    try {
      const res = await axios({
        method,
        url: `${apiUrl}${url}`,
        data,
      });
      setResponse(res.data);
    } catch (err) {
      setError("Ocorreu um erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, [method, url, data]);

  return { response, error, loading, fetchData };
};
