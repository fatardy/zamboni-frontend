import axiosClient from '../apiClient';

const prefix = '/admin/vehicle-type';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}

export function create({
  name,
  rate,
  overFee,
}) {
  return axiosClient.post(`${prefix}/`, {
    name,
    rate,
    overFee,
  });
}

export function update({
  vtId,
  name,
  rate,
  overFee,
}) {
  return axiosClient.post(`${prefix}/`, {
    vtId,
    name,
    rate,
    overFee,
  });
}

export function deleteBy({ vtId }) {
  return axiosClient.delete(`${prefix}/${vtId}`);
}
