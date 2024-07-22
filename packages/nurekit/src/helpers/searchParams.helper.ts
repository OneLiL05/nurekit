import { IConvertedTime } from "../types/index.js";

export const getScheduleParams = ({
	startTimestamp,
	endTimestamp,
}: IConvertedTime): URLSearchParams => {
	return new URLSearchParams({
		start: startTimestamp.toString(),
		end: endTimestamp.toString(),
	});
};
