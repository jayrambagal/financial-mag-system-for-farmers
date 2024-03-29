import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

// manually disabaling the devtools of react for deploying purpuse
if(process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    </Provider>
);

