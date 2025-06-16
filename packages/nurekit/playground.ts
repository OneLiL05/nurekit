// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nurekit, NurekitError } from "./dist/index.js";

const nurekit = new Nurekit();

try {
	const schedule = await nurekit.groups.getSchedule({
		id: 9312468,
		startedAt: "2024-09-01",
		endedAt: "2024-09-07",
	});

	console.log(schedule);
} catch (error: unknown) {
	if (error instanceof NurekitError) {
		console.error(error.message);
	}
}
