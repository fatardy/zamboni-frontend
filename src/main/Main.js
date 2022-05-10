import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import Login from '../pages/login';
import VerifyOtp from '../pages/verify-otp';
import Onboarding from '../pages/onboarding';

import AdminApp from './AdminApp';

export default function Main() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
