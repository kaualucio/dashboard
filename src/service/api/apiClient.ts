import { parseCookies, setCookie } from 'nookies';
import axios from 'axios';

//para todas as requisições serverSideRendering do Next deve passar o context(ctx)
//para todas as requisições browser to backend (backend proprio) não passar context(ctx)

export function getApiClient(ctx?: any) {
  const { access_token, refresh_token } = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let isRefreshing = false;

  if (access_token) {
    api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
  }

  api.interceptors.request.use((config) => {
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        !isRefreshing &&
        !originalRequest._retry &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        originalRequest._retry = true;
        isRefreshing = true;
        const { data } = await api.post('/api/tokens/refresh-token', {
          refresh_token,
        });
        setCookie(ctx, 'access_token', data.access_token, {
          maxAge: 60, // 15 minutes
        });
        originalRequest.headers = {
          Authorization: 'Bearer ' + data.access_token,
          'Content-Type': 'application/json',
        };
        console.log(originalRequest);
        return api(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return api;
}
