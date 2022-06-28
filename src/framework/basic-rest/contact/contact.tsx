import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchContact = async () => {
  const { data } = await http.get(API_ENDPOINTS.CONTACT);
  return {
    data: data,
  };
};

const useContactQuery = () => {
  return useQuery([API_ENDPOINTS.CONTACT], fetchContact);
};

export { useContactQuery, fetchContact };
