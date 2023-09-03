import { Nurekit } from "./client/index.js";

export * from "./client/index.js";
export * from "./types/index.js";

const nurekit = new Nurekit();

console.log(
	await nurekit.getSchedule({
		groupName: "пзпі-23-5",
		startTime: 1693170000,
		endTime: 1694811599,
	}),
);
