import Axios from 'axios';
import UtilityService from './UtilityService';
import RouteNames from '../router/RouteNames';
import config from '../constants/config';


const unauthorizedCodes = [401, 403];

const skipUnAuthRedirectionRoutes = ['/user', '/news' ];

const isUnAuthorized = (error) => {
    try {
        return unauthorizedCodes.indexOf(error.response.status) > -1;
    } catch (e) {
        return false;
    }
};

const onUnauthorizedResponse = (error) => {
    try {
        const url = error.response.config.url.split('?')[0];
        if (skipUnAuthRedirectionRoutes.indexOf(url) === -1) {
            UtilityService.setAuthCookie('');
            window.open(RouteNames.UnAuthorizedDefaultRoute, '_self'); //Changed to window open in order to force reload the entire browser tab.
        }
    } catch (e) {}
};

const ApiService = Axios.create({
    baseURL: config?.api_url || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiService.interceptors.request.use(
    (config) => {
        const token = UtilityService.getAuthCookie();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        if (isUnAuthorized(error)) {
            onUnauthorizedResponse(error);
        }
        return Promise.reject(error.response.data);
    }
);

ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isUnAuthorized(error)) {
            onUnauthorizedResponse(error);
        }
        return Promise.reject(error.response ? error.response.data : error);
    }
);

export default ApiService;
