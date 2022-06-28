import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchPopcornJerkyProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.POPCORN_JERKY_PRODUCTS);
  return data as Product[];
};
export const usePopcornJerkyProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.POPCORN_JERKY_PRODUCTS, options],
    fetchPopcornJerkyProducts
  );
};
