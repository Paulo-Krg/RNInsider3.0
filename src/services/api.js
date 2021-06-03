import axios from 'axios';

// key b640d6b5d01879b34e0403bd924f50c12a53ac36
export const key = 'b640d6b5d01879b34e0403bd924f50c12a53ac36';

// base URL: https://api-ssl.bitly.com/v4

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
    },
});

export default api;