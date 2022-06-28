import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchOrderStatus = async () => {
  const { data } = await http.get(API_ENDPOINTS.ORDER_STATUS);
  return {
    data: data,
  };
};

const useOrderStatusQuery = () => {
  return useQuery([API_ENDPOINTS.ORDER_STATUS], fetchOrderStatus);
};

export { useOrderStatusQuery, fetchOrderStatus };
