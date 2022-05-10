import axiosClient from '../apiClient';

const prefix = '/user/user';

export function getProfile() {
  return axiosClient.get(`${prefix}/`);
}

export function editProfile({
  firstName,
  lastName,
  phoneNumber,
  street1,
  street2,
  city,
  stateName,
  zipCode,
  country,
  deviceId,
  avatar,
}) {
  return axiosClient.put(`${prefix}/`, {
    firstName,
    lastName,
    phoneNumber,
    street1,
    street2,
    city,
    stateName,
    zipCode,
    country,
    deviceId,
    avatar,
  });
}
