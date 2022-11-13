import axios from 'axios';
import useSWR from 'swr';

export function useFetch<Data = any, Error = any>(
  url: string,
  params: any = {}
) {
  const { data, isValidating, mutate, error } = useSWR(
    url,
    async (url: string) => {
      const response = await axios.get(url, params);

      return response.data;
    }
  );

  return { data, isValidating, mutate, error };
}
