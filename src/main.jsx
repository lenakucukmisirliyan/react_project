import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { IntlProvider } from 'react-intl';
import { messages } from './constants/constant.js';
import LanguageSwitcher from './locales/LanguageSwitcher';

const Root = () => {
  const [locale, setLocale] = useState('tr');

  return(
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <LanguageSwitcher locale={locale} setLocale={setLocale} />
          <App lang={locale}/>
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);