import axiosInstance from './api';
import { METHOD } from '../constants';
import usePageLoader from '../utils/usePageLoader';

const useService = () => {
  const { showPageLoader, hidePageLoader } = usePageLoader();

  const serviceCall = async ({ url, method = METHOD.GET, params, data, headers = {} }) => {
    if (!url) {
      console.error('API Error: URL is required');
      return null;
    }
    try {
      showPageLoader();

      const response = await axiosInstance({
        method,
        url,
        params,
        data,
        headers,
      });

      return response?.data;
    } catch (error) {
      console.error('API Error:', error);
      return null;
    } finally {
      hidePageLoader();
    }
  };

  return { serviceCall };
};

export default useService;
