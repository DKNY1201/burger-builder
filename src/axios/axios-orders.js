import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-builder-f6926.firebaseio.com/"
});

export default instance;