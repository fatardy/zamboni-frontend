import axiosClient from '../apiClient';

const prefix = '/admin/vehicle';

export function getAll() {
  return axiosClient.get(`${prefix}/`);
}

export function create({
  vehId,
  make,
  model,
  licensePlate,
  locId,
  vtId,
  avatar,
}) {
  return axiosClient.post(`${prefix}/`, {
    vehId,
    make,
    model,
    licensePlate,
    locId,
    vtId,
    avatar,
  });
}

export function update({
  vehId,
  make,
  model,
  licensePlate,
  locId,
  vtId,
  avatar,
}) {
  return axiosClient.post(`${prefix}/`, {
    vehId,
    make,
    model,
    licensePlate,
    locId,
    vtId,
    avatar,
  });
}

export function deleteBy({ vehId }) {
  return axiosClient.delete(`${prefix}/${vehId}`);
}
