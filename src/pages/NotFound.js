import { FormattedMessage } from 'react-intl';

const NotFound = () => {
  return (
    <div className="text-center p-5">
      <h2>404</h2>
      <p>
        <FormattedMessage
          id="notfound.message"
          defaultMessage="Aradığınız sayfa bulunamadı."
        />
      </p>
    </div>
  );
};

export default NotFound;
