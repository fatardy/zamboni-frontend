import axiosClient from '../apiClient';

const prefix = '/admin/payment';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}
