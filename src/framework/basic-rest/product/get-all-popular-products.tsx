import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchPopularProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.POPULAR_PRODUCTS);
  return data as Product[];
};
export const usePopularProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    fetchPopularProducts
  );
};
