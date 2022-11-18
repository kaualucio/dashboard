import { parseCookies, setCookie } from 'nookies';
import axios from 'axios';

//para todas as requisições serverSideRendering do Next deve passar o context(ctx)
//para todas as requisições browser to backend (backend proprio) não passar context(ctx)

export function getApiClient(ctx?: any) {
  const {
    'beru.access_token': access_token,
    'beru.refresh_token': refresh_token,
  } = parseCookies(ctx);
  // const { handleChangeHasToFetchUser } = useFetchUserData()
  const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let isRefreshing = false;

  api.interceptors.request.use(
    async (config) => {
      if (access_token && config.headers) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        !isRefreshing &&
        !originalRequest._retry &&
        error.response.status === 401
      ) {
        originalRequest._retry = true;
        isRefreshing = true;
        try {
          const { data } = await api.post('/api/tokens/refresh-token', {
            refresh_token,
          });
          setCookie(ctx, 'beru.access_token', data.access_token, {
            maxAge: 60 * 60 * 24, // 15 minutes
          });
          originalRequest.headers = {
            Authorization: 'Bearer ' + data.access_token,
            'Content-Type': 'application/json',
          };
          return api(originalRequest);
        } catch (error) {
          console.log('catch error', error);
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
