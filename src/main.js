import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { store } from './app/store';
import App from './App';
import LanguageSwitcher from './locales/LanguageSwitcher';
import { messages } from './constants';
import './styles/main.scss';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = () => {
  const [locale, setLocale] = useState('tr');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <LanguageSwitcher locale={locale} setLocale={setLocale} />
          <App lang={locale} />
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <Root />
);
