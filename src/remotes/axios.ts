import axios, { CreateAxiosDefaults } from 'axios';
import { REACT_APP_SERVER_URL } from '@env';

const defaultConfig: CreateAxiosDefaults = {
    baseURL: 'https://b212c51a2452.ngrok.app',
};

const client = axios.create(defaultConfig);

export { client };
