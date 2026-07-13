import axios from "axios";
import { refreshAuth } from "../api/auth";
import camelcaseKeys from "camelcase-keys";
import { triggerLogout } from "../utils/authEvents";
import snakecaseKeys from "snakecase-keys";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v2/",
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data) config.data = snakecaseKeys(config.data, { deep: true });

  return config;
});

let refreshPromise: Promise<void> | null = null;

instance.interceptors.response.use(
  (res) => {
    res.data = camelcaseKeys(res.data, { deep: true });
    return res;
  },
  async (error) => {
    const { config, response } = error;

    if (
      response?.status !== 401 ||
      !config.headers.Authorization ||
      config._retry ||
      config.url.includes("/login")
    ) {
      return Promise.reject(error);
    }

    if (!refreshPromise) {
      refreshPromise = refreshAuth()
        .then((res) => {
          localStorage.setItem("token", res.data.accessToken);
        })
        .catch((err) => {
          triggerLogout();
          return Promise.reject(err);
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      await refreshPromise;
      config._retry = true;

      return instance(config);
    } catch (err) {
      config._retry = true;
      delete config.headers.Authorization;

      return instance(config);
    }
  }
);

export default instance;
