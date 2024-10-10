import axios from "axios";

const axiosClient = axios.create({
	baseURL: "https://api.mindenit.org",
	headers: { "Access-Control-Allow-Origin": "*" },
});

export { axiosClient };
