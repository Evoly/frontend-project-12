import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

import store from './store/index.js';

import App from './App.jsx';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false
    }
  });


const Init = () => {
    
    return (
      <Provider store={store}>
        <App i18n={i18n} />
        <ToastContainer />
      </Provider>
    )
  };

export default Init;
