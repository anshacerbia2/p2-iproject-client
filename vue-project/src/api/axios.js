import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://i-project-hacktiv8.herokuapp.com'
});

export default instance