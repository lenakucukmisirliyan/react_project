import { useState } from "react";
import useContactActions from "./useContactActions";
import Loader from "../../components/Loader";

const Contact = () => {
  const { sendContactForm } = useContactActions();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Başarılı gönderim kontrolü için bir state ekleyebilirsin (opsiyonel)
  const [success, setSuccess] = useState(false);

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
      <h2>İletişim</h2>

      <form onSubmit={handleSubmit}>
        <label className="mb-3">
          Adınız:
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
          E-posta:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label className="text-muted">
          Mesajınız:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <br />

        <button type="submit" className="btn btn-primary">
          Gönder
        </button>
      </form>

      <Loader />
    </div>
  );
};

export default Contact;
