import useSWR from 'swr';
import { api } from '../service/api/api';

export function useFetch<Data = any, Error = any>(
  url: string,
  params: any = {}
) {
  const { data, isValidating, mutate, error } = useSWR(
    url,
    async (url: string) => {
      const response = await api.get(url, params);

      return response.data;
    }
  );

  return { data, isValidating, mutate, error };
}
