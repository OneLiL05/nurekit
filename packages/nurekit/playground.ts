// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nurekit, NurekitError } from "./dist/index.js";

const nurekit = new Nurekit();

try {
	const schedule = await nurekit.groups.getSchedule({
		id: 9312468,
		startedAt: 1725138000,
		endedAt: 1725656400,
	});

	console.log(schedule);
} catch (error: unknown) {
	if (error instanceof NurekitError) {
		console.error(error.message);
	}
}
