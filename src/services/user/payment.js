import axiosClient from '../apiClient';

const prefix = '/user/payment';

export function create({
  amount,
  method,
  cardNo,
  invId,
}) {
  return axiosClient.post(`${prefix}/`, {
    amount,
    method,
    cardNo,
    invId,
  });
}

export function dummy() {}
