import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { store } from './app/store';
import App from './App';
import LanguageSwitcher from './locales/LanguageSwitcher';
import ThemeSwitcher from './components/ThemeSwitcher';
import { messages } from './constants';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";

const Root = () => {
  const [locale, setLocale] = useState('tr');

  useEffect(() => {
    const storedLocale = localStorage.getItem("appLocale");
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("appLocale", newLocale);
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <App lang={locale} setLocale={setLocale} />
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <Root />
);
