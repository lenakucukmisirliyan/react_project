import { useState } from "react";
import { FormattedMessage } from "react-intl";
import useContactActions from "./useContactActions";

const Contact = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const { sendContactForm, loading, error } = useContactActions();


  const handleSubmit = (e) => {
    e.preventDefault();
    sendContactForm({ name, surname, email });

    setName('');
    setSurname('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h2 className="header-font">
          <FormattedMessage id="contact.title" />
        </h2>

        <label className="form-label">
          <FormattedMessage id="contact.name" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            disabled={loading}
          />
        </label>
        <br />

        <label className="form-label">
          <FormattedMessage id="contact.surname" />
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="form-control"
            disabled={loading}
          />
        </label>
        <br />

        <label className="form-label">
          <FormattedMessage id="contact.email" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            disabled={loading}
          />
        </label>
        <br />

        <button type="submit" className="btn btn-info" disabled={loading}>
          {loading ? 'Sending...' : <FormattedMessage id="form.send" />}
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </form>
  );
};

export default Contact;
