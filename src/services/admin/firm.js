import axiosClient from '../apiClient';

const prefix = '/admin/firm';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}

export function create({
  name,
  regNo,
}) {
  return axiosClient.post(`${prefix}/`, {
    name,
    regNo,
  });
}

export function update({
  firmId,
  name,
  regNo,
}) {
  return axiosClient.post(`${prefix}/`, {
    firmId,
    name,
    regNo,
  });
}

export function deleteBy({ firmId }) {
  return axiosClient.delete(`${prefix}/${firmId}`);
}
