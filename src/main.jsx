import React, {useState} from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import { IntlProvider } from 'react-intl';
import messages_tr from './locales/tr.json';
import messages_en from './locales/en.json';

const messages = {
  tr: messages_tr,
  en: messages_en,
};

function Root() {
  const [locale, setLocale] = useState('tr');

  return(
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <div>
            <button onClick={() => setLocale('tr')}>Türkçe</button>
            <button onClick={() => setLocale('en')}>English</button>
            <App lang={locale}/>
          </div>
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