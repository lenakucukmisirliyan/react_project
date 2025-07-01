import { useState } from 'react';
import useService from '../../services/useService';
import { apiConfigs } from '../../services/api';

const useContactActions = () => {
  const { serviceCall } = useService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendContactForm = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      await serviceCall({
        ...apiConfigs.contact.send,
        params: formData,
      });
      alert('Form has been sent');
    } catch (err) {
      console.error('Failed to send form', err);
      setError('Failed to send form');
      alert('Failed to send form');
    } finally {
      setLoading(false);
    }
  };

  return { sendContactForm, loading, error };
};

export default useContactActions;
