import axiosClient from '../apiClient';

const prefix = '/user/public';

export function getAllLocations() {
  return axiosClient.get(`${prefix}/location`);
}

export function getAllVehicles({ locId }) {
  return axiosClient.get(`${prefix}/vehicle/${locId}`);
}
