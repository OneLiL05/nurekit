import { handleAxiosError } from "../helpers/axios.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IAuditorium } from "../types/index.js";

interface FindOneParams {
	name: string;
}

export class AuditoriumsModule {
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
	public async findOne({ name }: FindOneParams): Promise<IAuditorium> {
		const auditoriums = await this.findMany();

		const auditorium = auditoriums.find(
			(auditorium) => auditorium.name === name,
		);

		if (!auditorium) {
			throw new Error("Auditorium with such 'name' doesn't exist");
		}

		return auditorium;
	}
}
