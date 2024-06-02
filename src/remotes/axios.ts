import axios, { CreateAxiosDefaults } from 'axios';
import { REACT_APP_SERVER_URL } from '@env';

const defaultConfig: CreateAxiosDefaults = {
    baseURL: 'http://3.230.242.105:8080/',
};

const client = axios.create(defaultConfig);

export { client };
