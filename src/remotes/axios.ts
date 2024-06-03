import axios, { CreateAxiosDefaults } from 'axios';
import { REACT_APP_SERVER_URL } from '@env';

const defaultConfig: CreateAxiosDefaults = {
    baseURL: 'https://projectpanda.ngrok.io',
};

const client = axios.create(defaultConfig);

export { client };
