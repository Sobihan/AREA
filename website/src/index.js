import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from './Account/Login';
import { SignUp } from './Account/SignUp';
import { OAuthCallback } from './OAuth/OAuthCallback';
import { Dashboard } from './Pages/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/oauth2_callback" element={<OAuthCallback />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
