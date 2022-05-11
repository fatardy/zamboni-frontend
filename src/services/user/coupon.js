import axiosClient from '../apiClient';

const prefix = '/user/coupon';

export function getUsersCoupons() {
  return axiosClient.get(`${prefix}/`);
}
