import axios from "axios";
import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
import { getScheduleParams } from "../helpers/searchParams.helper.js";
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
	 * Find all Nure auditoriums
	 *
	 * @returns an array of auditorium objects
	 *
	 * @example Example usage:
	 * ```typescript
	 * const auditoriums = await nurekit.auditoriums.findMany()
	 * ```
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/auditoriums-endpoint/#findmany)
	 *
	 * @publicApi
	 */
	public async findMany(): Promise<IAuditorium[]> {
		return axiosClient
			.get<IAuditorium[]>("/lists/auditories")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	/**
	 * Find an auditory by name
	 *
	 * @param name name of auditorium you want to get info about
	 * @returns an auditorium object
	 *
	 * @example Example usage:
	 * ```typescript
	 * const auditorium = await nurekit.auditoriums.findOne("285")
	 * ```
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/auditoriums-endpoint/#findone)
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
	 * Get auditorium schedule
	 *
	 * @param auditoriumName name of an auditorium you want to get schedule for
	 * @param startTime beginning of the time period for which the schedule is to be retrieved
	 * @param endTime end of the time period for which the schedule is to be retrieved
	 * @returns an array of subjects that for specific auditorium
	 *
	 * @example Example usage:
	 * ```typescript
	 * const schedule = await nurekit.auditoriums.getSchedule({
	 * 	auditoriumName: "287",
	 *  startTime: "2023-09-11",
	 *  endTime: "2023-09-15",
	 * });
	 * ```
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/auditoriums-endpoint/#getschedule)
	 *
	 * @publicApi
	 */
	public async getSchedule({
		auditoriumName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { id: auditoriumId } = await this.findOne(auditoriumName);

		const timestamps = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		const params = getScheduleParams(timestamps);

		const schedule = await axios.get<ISchedule[]>(
			`/schedule/auditories/${auditoriumId}`,
			{ params },
		);

		return schedule.data;
	}
}
