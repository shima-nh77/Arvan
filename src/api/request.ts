import axios, { AxiosInstance } from 'axios';
import { showToast } from '../utility/toast';
import { cookieManager } from '../utility/cookieManager';

interface RequestOptions {
  withAuth?: boolean;
  showError?: boolean;
}

const API_URL = 'https://api-3281216083-arvancloud-challenge.apps.ir-central1.arvancaas.ir/api';

class Request {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    this.instance.interceptors.request.use((config) => {
      const token = cookieManager.getToken();
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error?.response?.data?.errors || 'Something went wrong';
        showToast.error({
          title: 'Error',
          description: typeof message === 'object' ? Object.keys(message).map(key => `${key} ${message[key]}`).join(', ') : message
        });
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string | null) {
    if (token) {
      cookieManager.setToken(token);
      this.instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      cookieManager.removeToken();
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.instance.get(url);
    return response.data;
  }

  async post<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
    const response = await this.instance.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
    const response = await this.instance.put(url, data);
    return response.data;
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    const response = await this.instance.delete(url);
    return response.data;
  }
}

export default new Request();