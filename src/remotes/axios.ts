import axios, { CreateAxiosDefaults } from 'axios';
import { REACT_APP_SERVER_URL } from '@env';

const defaultConfig: CreateAxiosDefaults = {
    baseURL: REACT_APP_SERVER_URL,
};

const client = axios.create(defaultConfig);

export { client };
