import axiosInstance from './api';
import { METHOD } from '../constants';
import usePageLoader from '../utils/usePageLoader';

const useService = () => {
  const { showPageLoader, hidePageLoader } = usePageLoader();

  const serviceCall = async ({ url, method = METHOD.GET, params, data, headers = {} }) => {
    try {
      showPageLoader(); // ⏳ 1. Loader'ı başlat

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
      hidePageLoader(); // ✅ 2. Loader'ı durdur
    }
  };

  return { serviceCall };
};

export default useService;
