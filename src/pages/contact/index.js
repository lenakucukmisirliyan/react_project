import { useState } from "react";
import useContactActions from "./useContactActions";
import Loader from "../../components/Loader";
import { FormattedMessage } from 'react-intl';
import { useSelector } from "react-redux";

const Contact = () => {
  const { sendContactForm } = useContactActions();
  const isLoading = useSelector((state) => state.loader.isLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendContactForm(formData); // loader bu işlem sırasında aktif olur

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <h2><FormattedMessage id="contact.title" defaultMessage="İletişim" /></h2>

      <form onSubmit={handleSubmit}>
        <label className="mb-3">
          <FormattedMessage id="contact.name" defaultMessage="Adınız:" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="mb-3">
          <FormattedMessage id="contact.email" defaultMessage="Email:" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="mb-3">
          <FormattedMessage id="contact.message" defaultMessage="Mesajınız:" />
          <textarea
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <br />

        <button type="submit" className="btn btn-primary">
          <FormattedMessage id="form.send" defaultMessage="Gönder" />
        </button>
      </form>

      {isLoading && < Loader />}
    </div>
  );
};

export default Contact;
