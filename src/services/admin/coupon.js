import axiosClient from '../apiClient';

const prefix = '/admin/coupon';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}

export function create({
  name,
  percent,
  flatRate,
  startDate,
  endDate,
}) {
  return axiosClient.post(`${prefix}/`, {
    name,
    percent,
    flatRate,
    startDate,
    endDate,
  });
}

export function update({
  coupId,
  name,
  percent,
  flatRate,
  startDate,
  endDate,
}) {
  return axiosClient.post(`${prefix}/`, {
    coupId,
    name,
    percent,
    flatRate,
    startDate,
    endDate,
  });
}

export function deleteBy({ coupId }) {
  return axiosClient.delete(`${prefix}/${coupId}`);
}

export function addToUser({
  coupId,
  userId,
}) {
  return axiosClient.post(`${prefix}/`, {
    coupId,
    userId,
  });
}
