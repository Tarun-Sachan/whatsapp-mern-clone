import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:9000",
  
  baseURL: "https://whatsapp-mern-clone-theta.vercel.app/",
});

export default instance;
