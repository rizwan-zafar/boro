import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchFlashSellProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FLASH_SELL_PRODUCTS);
  return data as Product[];
};
export const useFlashSellProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.FLASH_SELL_PRODUCTS, options],
    fetchFlashSellProducts
  );
};
