import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

let baseURL;

if (import.meta.env.SSR) {
  baseURL = process.env.VITE_SSR_HOST || "http://localhost";
} else {
  baseURL = window.location.origin;
}

export const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});
export const axiosBaseQuery =
  (
    { serverEndpoint }: { serverEndpoint?: string } = {
      serverEndpoint: "",
    },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      withCredentials?: AxiosRequestConfig["withCredentials"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, withCredentials }) => {
    try {
      const result = await axiosInstance({
        url: serverEndpoint + url,
        method,
        data,
        params,
        headers,
        withCredentials,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
