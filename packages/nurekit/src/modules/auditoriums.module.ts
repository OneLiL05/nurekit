import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
import { transformSchedule } from "../helpers/schedule.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IAuditorium, IRawSchedule } from "../types/index.js";

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
	 *   id: number;
	 *   name: string;
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
			.get<IAuditorium[]>("/api/auditories")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	/**
	 * Method returns object with such fields:
	 * ```typescript
	 * {
	 *   id: number;
	 *   name: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const auditorium = await nurekit.auditoriums.findOne({ name: "285" })
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
			(auditorium) => auditorium.name === name,
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
	 *  id: number;
	 *  startTime: number;
	 *  endTime: number;
	 *  auditorium: string;
	 *  numberPair: number;
	 *  type: string;
	 *  updatedAt: Date;
	 *  groups: {
	 *    id: number;
	 *    name: string;
	 *  }[];
	 *  teachers: {
	 *    id: number;
	 *    fullName: string;
	 *    shortName: string;
	 *  }[];
	 *  subject: {
	 *    id: number;
	 *    brief: string;
	 *    title: string;
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
		const { id: auditoriumId } = await this.findOne(auditoriumName);

		const { startTimestamp, endTimestamp } = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		const rawSchedule = await axiosClient
			.get<IRawSchedule[]>(
				`/api/schedule?type=auditory&id=${auditoriumId}&start_time=${startTimestamp}&end_time=${endTimestamp}`,
			)
			.then((res) => res.data)

		const result = transformSchedule(rawSchedule);

		return result;
	}
}
