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
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '1rem' }}>
            <button className="btn btn-danger" style={{marginRight: '10px'}}  onClick={() => setLocale('tr')}>Türkçe</button>
            <button className="btn btn-primary" onClick={() => setLocale('en')}>English</button>
          </div>
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