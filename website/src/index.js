import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

import { Login } from './Account/Login';
import { SignUp } from './Account/SignUp';
import { OAuthCallback } from './OAuth/OAuthCallback';
import { Home } from './Pages/Home';
import { Services } from './Pages/Services';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/oauth2_callback" element={<OAuthCallback />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
          </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
