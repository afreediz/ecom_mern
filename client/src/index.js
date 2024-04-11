import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/ReactToastify.css'
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import UserContextProvider from './context/user'
import ProductContextProvider from './context/products'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </ProductContextProvider>
    
  </React.StrictMode>
);