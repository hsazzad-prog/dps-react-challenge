import axios from 'axios';

const API_URL = 'http://192.168.56.1:3000/src/assets/users.json';

export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data.users;
};
