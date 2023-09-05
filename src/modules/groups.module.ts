import { handleAxiosError } from "../helpers/axios.helper.js";
import { toTimestamp } from "../helpers/date.helper.js";
import { transformSchedule } from "../helpers/schedule.helper.js";
import { IGroup, IRawSchedule, ISchedule } from "../index.js";
import { axiosClient } from "../libs/axios.js";

interface FindOneParams {
	name: string;
}

interface GetScheduleParams {
	groupName: string;
	startTime: string;
	endTime: string;
}

export class GroupsModule {
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
	 const group = await nurekit.groups.findMany()
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-groups)
	 *
	 * @publicApi
	 */
	public async findMany(): Promise<IGroup[]> {
		return axiosClient
			.get<IGroup[]>("/api/groups")
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
	 const group = await nurekit.groups.findOne({ name: "пзпі-23-5" })
	 * ```
	 *
	 * @param name name of group you want to get info about
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-a-group)
	 *
	 * @publicApi
	 */
	public async findOne({ name }: FindOneParams): Promise<IGroup> {
		const groups = await this.findMany();

		const group = groups.find((group) => group.name === name.toUpperCase());

		if (!group) {
			throw new Error("Group with such name doesn't exist");
		}

		return group;
	}

	/**
	 * Method returns schedule:
	 * ```typescript
	 * {
	 *   id: number;
	 *   name: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const schedule = await nurekit.groups.getSchedule({
  	  groupName: "пзпі-23-5",
  	  startTime: "2023-09-11",
  	  endTime: "2023-09-15",
	});
	 * ```
	 *
	 * @param groupName name of group you want to get schedule for
	 * @param startTime
	 * @param endTime
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-schedule)
	 *
	 * @publicApi
	 */
	public async getSchedule({
		groupName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { id: groupId } = await this.findOne({ name: groupName });

		const startTimestamp = toTimestamp(startTime);
		const endTimestamp = toTimestamp(endTime);

		const rawSchedule = await axiosClient
			.get<IRawSchedule[]>(
				`/api/schedule?type=group&id=${groupId}&start_time=${startTimestamp}&end_time=${endTimestamp}`,
			)
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformSchedule(rawSchedule);

		return result;
	}
}
