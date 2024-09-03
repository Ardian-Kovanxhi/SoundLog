import { createRoot } from "react-dom/client";
import React from 'react';

import './index.scss';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider, Modal } from './context/Modal.js';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';
import { PageProvider } from './context/Page.js';
import { AudioProvider } from './context/Audio.js';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageProvider>
          <ModalProvider>
            <AudioProvider>
              <App />
            </AudioProvider>
            <Modal />
          </ModalProvider>
        </PageProvider>
      </BrowserRouter>
    </Provider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);