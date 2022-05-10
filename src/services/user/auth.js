import axiosClient from '../apiClient';

const prefix = '/user/auth';

export function authorize({
  email,
  deviceId,
}) {
  return axiosClient.post(`${prefix}/`, {
    email,
    deviceId,
  });
}

export function verifyOtp({
  email,
  deviceId,
  otp,
}) {
  return axiosClient.post(`${prefix}/verify-otp`, {
    email,
    deviceId,
    otp,
  });
}

export function sendOtp({
  email,
}) {
  return axiosClient.post(`${prefix}/send-otp`, {
    email,
  });
}
