import axiosClient from '../apiClient';

const prefix = '/admin/location';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}

export function create({
  name,
  phoneNumber,
  email,
  street1,
  street2,
  city,
  stateName,
  zipCode,
  country,
}) {
  return axiosClient.post(`${prefix}/`, {
    name,
    phoneNumber,
    email,
    street1,
    street2,
    city,
    stateName,
    zipCode,
    country,
  });
}

export function update({
  locId,
  name,
  phoneNumber,
  email,
  street1,
  street2,
  city,
  stateName,
  zipCode,
  country,
}) {
  return axiosClient.post(`${prefix}/`, {
    locId,
    name,
    phoneNumber,
    email,
    street1,
    street2,
    city,
    stateName,
    zipCode,
    country,
  });
}

export function deleteBy({ locId }) {
  return axiosClient.delete(`${prefix}/${locId}`);
}
