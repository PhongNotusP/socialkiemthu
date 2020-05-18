import axios from 'axios';
const SERVER_URL = 'http://localhost:4000';
function get(subUrl) {
    return axios.get(SERVER_URL + subUrl);
}

function post(subUrl, body) {
    return axios.post(SERVER_URL + subUrl, body);
}

function put(subUrl, body) {
    return axios.put(SERVER_URL + subUrl, body);
}

function del(subUrl) {
    return axios.delete(SERVER_URL + subUrl);
}
export default { get, post, put, del };