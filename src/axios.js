import axios from "axios";


axios.defaults.baseURL = `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/v1/`;

