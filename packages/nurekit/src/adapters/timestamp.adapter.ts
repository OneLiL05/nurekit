import { toTimestamp } from "../helpers/date.helper.js";

interface ConvertParams {
	startTime: string;
	endTime: string;
}

interface IConvertedTime {
	startTimestamp: number;
	endTimestamp: number;
}

export class TimestampAdapter {
	public convert({ startTime, endTime }: ConvertParams): IConvertedTime {
		return {
			startTimestamp: toTimestamp(startTime),
			endTimestamp: toTimestamp(endTime),
		};
	}
}
