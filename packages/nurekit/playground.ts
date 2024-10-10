// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { Nurekit } from "./dist/index.js";

const nurekit = new Nurekit();

try {
	const schedule = await nurekit.groups.getSchedule({
		groupName: "пзпі-23-5",
		startTime: "2023-09-01",
		endTime: "2023-09-07",
	});

	console.log(schedule);
} catch (error: unknown) {
	if (error instanceof AxiosError) {
		console.error(error.cause);
	}
}
