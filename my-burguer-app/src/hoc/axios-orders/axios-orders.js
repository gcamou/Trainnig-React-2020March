import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-db-c0f66.firebaseio.com/'
});

export default instance;