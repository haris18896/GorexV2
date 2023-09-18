import axios from 'axios';
import {getFirstValidationError} from './getFirstValidationError';
import {defaultConfig} from '../utils/defaultConfig';

import {getData, setData} from './common';

const axiosInstance = axios.create({
  ...defaultConfig(),
  baseURL: 'http://portal.gorex.ai:8070/web/',
  // baseURL: `https://partner.gorex.ai/web/`,
});
axiosInstance.defaults.timeout = 30000;

axiosInstance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error?.config?.url !== '/auth/login'
    ) {
      originalRequest._retry = true;
      const result = await axiosInstance.post('/auth/refresh');
      setData('token', result?.data?.data);
      axiosInstance.defaults.headers.common['Authorization'] =
        'Bearer ' + result?.accessToken;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(getFirstValidationError(error));
  },
);

axiosInstance.interceptors.request.use(
  async config => {
    const tokens = await getData('token');

    config.headers = {
      Authorization: `Bearer ${
        config?.url === '/auth/refresh'
          ? tokens?.refreshToken
          : tokens?.accessToken
      }`,
      'Access-Control-Request-Method': '*',
      'Content-Type': 'application/json',
      Connection: 'Keep-Alive',
    };
    return config;
  },
  async error => {
    return Promise.reject(getFirstValidationError(error));
  },
);
// export const setAxiosAuthToken = token => {
//   axiosInstance.defaults.headers['auth-token'] = `${token}`;
// };
export default axiosInstance;
