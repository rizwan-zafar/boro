import { ShopsQueryOptionsType, Shop } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchShops = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.SHOPS);
  return { shop: { data } };
};

export const useShopsQuery = (options: ShopsQueryOptionsType) => {
  return useQuery<{ shop: { data: Shop[] } }, Error>(
    [API_ENDPOINTS.SHOPS, options],
    fetchShops
  );
};
