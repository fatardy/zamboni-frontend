import axiosClient from '../apiClient';

const prefix = '/admin/trip';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}
