import axiosClient from '../apiClient';

const prefix = '/admin/invoice';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}
