import useService from '../../services/useService';
import { apiConfigs } from '../../services/api';
import { useDispatch } from 'react-redux';
import { addSentForm } from '../../features/contact/contactSlice';

const useContactActions = () => {
  const { serviceCall } = useService();
  const dispatch = useDispatch();

  const sendContactForm = async (formData) => {
    try {
      const response = await serviceCall({
        ...apiConfigs.contact.send,
        data: formData,
      });

      if (response) {
        dispatch(addSentForm(formData));
        alert('Form başarıyla gönderildi');
      } else {
        alert('Form gönderilemedi');
      }
    } catch (err) {
      console.error('Form gönderimi başarısız', err);
      alert('Sunucu hatası oluştu');
    }
  };

  return { sendContactForm };
};

export default useContactActions;
