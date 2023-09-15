import axios from "axios";

const axiosClient = axios.create({
	baseURL: "https://nure-dev.pp.ua",
});

export { axiosClient };
