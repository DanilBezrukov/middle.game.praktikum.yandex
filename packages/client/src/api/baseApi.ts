import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

export const axiosInstance = axios.create({
  baseURL: __API_ENDPOINT__.url,
  timeout: 5000,
});

export const BASE_URL = __API_ENDPOINT__.url + "/api/v2";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = {
      baseUrl: BASE_URL,
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
        url: baseUrl + url,
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
