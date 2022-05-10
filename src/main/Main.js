import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import Login from '../pages/login';
import VerifyOtp from '../pages/verify-otp';
import Onboarding from '../pages/onboarding';
import Account from '../pages/account';
import Home from '../pages/home';

import AdminApp from './AdminApp';
import AdminHome from '../admin-pages/admin-home';
import AdminLogin from '../admin-pages/admin-login';
import AdminVerifyOtp from '../admin-pages/admin-verify-otp';
import AdminLocation from '../admin-pages/admin-location';
import AdminLocationCreate from '../admin-pages/admin-location-create';
import AdminVehicleType from '../admin-pages/admin-vehicle-type';
import AdminVehicleTypeCreate from '../admin-pages/admin-vehicle-type-create';
import AdminVehicle from '../admin-pages/admin-vehicle';
import AdminVehicleCreate from '../admin-pages/admin-vehicle-create';

export default function Main() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/admin" element={<AdminApp />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/location" element={<AdminLocation />} />
            <Route path="/admin/location/create" element={<AdminLocationCreate />} />
            <Route path="/admin/vehicle-type" element={<AdminVehicleType />} />
            <Route path="/admin/vehicle-type/create" element={<AdminVehicleTypeCreate />} />
            <Route path="/admin/vehicle" element={<AdminVehicle />} />
            <Route path="/admin/vehicle/create" element={<AdminVehicleCreate />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/verify-otp" element={<AdminVerifyOtp />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
