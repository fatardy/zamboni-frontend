import axiosClient from '../apiClient';

const prefix = '/admin/user';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}

export function makeAdmin({ userId }) {
  return axiosClient.put(`${prefix}/`, {
    userId,
  });
}
