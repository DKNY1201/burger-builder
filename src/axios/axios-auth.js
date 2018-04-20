import axios from 'axios';

const instance = axios.create({
    baseURL: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJrLzFwteGXLsU_9BHs0gIrPWBIpkK-Vs"
});

export default instance;