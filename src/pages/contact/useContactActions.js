import useService from '../../services/useService';
import { apiConfigs } from '../../services/api';
// import { useDispatch } from 'react-redux';
// import { showError } from '../../features/error/errorSlice'; // Eğer error sistemi varsa

const useContactActions = () => {
  const { serviceCall } = useService();
  // const dispatch = useDispatch(); // Hata sistemin varsa

  const sendContactForm = async (formData) => {
    try {
      const response = await serviceCall({
        ...apiConfigs.contact.send,
        data: formData, // POST için data olmalı
      }); // loader bu işlem sırasında otomatik başlar ve biter

      if (response) {
        alert('Form başarıyla gönderildi');
      } else {
        // dispatch(showError("Form gönderilemedi")); // İleri seviye
        alert('Form gönderilemedi');
      }
    } catch (err) {
      console.error('Form gönderimi başarısız', err);
      // dispatch(showError("Sunucu hatası oluştu")); // varsa
      alert('Sunucu hatası oluştu');
    }
  };

  return { sendContactForm };
};

export default useContactActions;
