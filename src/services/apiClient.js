import axios from 'axios';
import CONFIG from '../main/config';

// eslint-disable-next-line new-cap
const axiosClient = new axios.create({
    baseURL: `${CONFIG.ENDPOINT}`,
    timeout: 10000,
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
    // console.log(error);
        if (error.response.status === 403) {
            console.log('STATUS is 403');
        }
        return Promise.reject(error);
    },
);

axiosClient.interceptors.request.use((request) => {
    request.headers = {
        access_token: CONFIG.AUTH_TOKEN,
    };
    // console.log(`request - ${JSON.stringify(request)}`);
    return request;
});

export default axiosClient;
