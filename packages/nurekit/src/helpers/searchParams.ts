import { TimeInterval } from "../types/index.js";

export const getScheduleParams = ({
	start,
	end,
}: TimeInterval): URLSearchParams => {
	return new URLSearchParams({
		startedAt: start,
		endedAt: end,
	});
};
