import axios from "axios";

const axiosClient = axios.create({
	baseURL: "https://api.mindenit.tech",
});

export { axiosClient };
