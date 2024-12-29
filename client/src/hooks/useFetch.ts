/* eslint-disable react-hooks/exhaustive-deps */
// it will get mad if i don't disable it because of fetch data in useeffect
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T = unknown>(url: string, options?: AxiosRequestConfig) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response: AxiosResponse<T> = await axios(url, options);
      setState({ data: response.data, loading: false, error: null });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setState({
          data: null,
          loading: false,
          error: error.response?.data?.message,
        });
      } else {
        setState({ data: null, loading: false, error: "An error occurred" });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return state;
};

export default useFetch;
