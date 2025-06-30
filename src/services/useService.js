import axiosInstance from './api';

const useService = () => {
  const serviceCall = async ({ url, method = 'GET', params }) => {
    try {
      const response = await axiosInstance({ method, url, params });
      return response?.data;
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  };

  return { serviceCall };
};

export default useService;
