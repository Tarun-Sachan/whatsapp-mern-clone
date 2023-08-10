import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:9000",
  
  baseURL: ${window.location.origin},
});

export default instance;
