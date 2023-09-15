import { AxiosError } from "axios";

const handleAxiosError = (error: AxiosError) => {
	if (error.response) {
		console.log(error.response.data);
		throw new Error(JSON.stringify(error.response.data));
	} else if (error.request) {
		throw new Error(error.request);
	} else {
		throw new Error(error.message);
	}
};

export { handleAxiosError };
