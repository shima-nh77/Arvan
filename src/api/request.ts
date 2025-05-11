import axios, { AxiosInstance } from 'axios';
import { showToast } from '../utility/toast';

interface RequestOptions {
  withAuth?: boolean;
  showError?: boolean;
}

const API_URL = 'https://api.realworld.io/api';

class Request {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Response interceptor
    this?.instance?.interceptors?.response?.use(
      (response) => response,
      (error) => {
        const message = error?.response?.data?.errors || 'Something went wrong';
        showToast?.error({
          title: 'Error',
          description: typeof message === 'object' ? Object.keys(message).map(key => `${key} ${message[key]}`)?.join(', ') : message
        });
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string | null) {
    if (token) {
      this.instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
      delete this.instance.defaults.headers.common['Authorization'];
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await this?.instance?.get(url);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
    try {
      const response = await this?.instance?.post(url, data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async put<T>(url: string, data: any, options?: RequestOptions): Promise<T> {
    try {
      const response = await this?.instance?.put(url, data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    try {
      const response = await this?.instance?.delete(url);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Request();