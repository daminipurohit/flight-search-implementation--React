import axios from 'axios';

const baseURL = window && window.getBaseURL();

export default axios.create({
    baseURL,
    responseType: 'json'
});
