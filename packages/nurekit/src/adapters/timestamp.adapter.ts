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
			startTimestamp: this.#toTimestamp(startTime),
			endTimestamp: this.#toTimestamp(endTime),
		};
	}

	#toTimestamp(date: string): number {
		const parsedDate = Date.parse(date);

		return parsedDate / 1000;
	}
}
