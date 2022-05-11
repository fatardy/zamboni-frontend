import axiosClient from '../apiClient';

const prefix = '/user/trip';

export function create({
  pickDate,
  dropDate,
  pickLocId,
  dropLocId,
  odoStart,
  odoLimit,
  odoEnd,
  vehId,
  coupId,
}) {
  return axiosClient.post(`${prefix}/`, {
    pickDate,
    dropDate,
    pickLocId,
    dropLocId,
    odoStart,
    odoLimit,
    odoEnd,
    vehId,
    coupId,
  });
}

export function dummy() {}
