import axios from 'axios';
import token from '../config';

export const key = token.BitlyApiToken;

// base URL: https://api-ssl.bitly.com/v4
const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
    },
});

export default api;