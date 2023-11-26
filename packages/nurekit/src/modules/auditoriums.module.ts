import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IAuditorium, ISchedule } from "../types/index.js";

interface GetScheduleParams {
	auditoriumName: string;
	startTime: string;
	endTime: string;
}

export class AuditoriumsModule {
	#timestampAdapter = new TimestampAdapter();

	/**
	 * Method returns array of objects with such fields:
	 * ```typescript
	 * {
	 *   Id: number;
	 *   Name: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const auditoriums = await nurekit.auditoriums.findMany()
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-auditoriums)
	 *
	 * @publicApi
	 */
	public async findMany(): Promise<IAuditorium[]> {
		return axiosClient
			.get<IAuditorium[]>("/auditories")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	/**
	 * Method returns object with such fields:
	 * ```typescript
	 * {
	 *   Id: number;
	 *   Name: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const auditorium = await nurekit.auditoriums.findOne("285")
	 * ```
	 *
	 * @param name name of auditorium you want to get info about
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-auditorium)
	 *
	 * @publicApi
	 */
	public async findOne(name: string): Promise<IAuditorium> {
		const auditoriums = await this.findMany();

		const auditorium = auditoriums.find(
			(auditorium) => auditorium.Name === name,
		);

		if (!auditorium) {
			throw new Error("Auditorium with such 'name' doesn't exist");
		}

		return auditorium;
	}

	/**
	 * Method returns schedule:
	 * ```typescript
	 *{
	 *  Id: number;
	 *  StartTime: number;
	 *  EndTime: number;
	 *  Auditory: string;
	 *  NumberPair: number;
	 *  Type: string;
	 *  Groups: {
	 *    Id: number;
	 *    Name: string;
	 *  }[];
	 *  Teachers: {
	 *    Id: number;
	 *    FullName: string;
	 *    ShortName: string;
	 *  }[];
	 *  Subject: {
	 *    Id: number;
	 *    Brief: string;
	 *    Title: string;
	 *  };
	 *}[]
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const schedule = await nurekit.auditoriums.getSchedule({
  	  auditoriumName: "287",
  	  startTime: "2023-09-11",
  	  endTime: "2023-09-15",
	});
	 * ```
	 *
	 * @param auditoriumName name of an auditorium you want to get schedule for
	 * @param startTime
	 * @param endTime
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-schedule)
	 *
	 * @publicApi
	 */
	public async getSchedule({
		auditoriumName,
		startTime,
		endTime,
	}: GetScheduleParams) {
		const { Id: auditoriumId } = await this.findOne(auditoriumName);

		const { startTimestamp, endTimestamp } = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		return axiosClient
			.get<ISchedule[]>(
				`/schedule?type=auditory&id=${auditoriumId}&start_time=${startTimestamp}&end_time=${endTimestamp}`,
			)
			.then((res) => res.data)
	}
}
