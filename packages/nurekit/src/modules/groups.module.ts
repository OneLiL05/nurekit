import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
import { getScheduleParams } from "../helpers/searchParams.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IGroup, ISchedule } from "../types/index.js";

interface GetScheduleParams {
	groupName: string;
	startTime: string;
	endTime: string;
}

export class GroupsModule {
	#timestampAdapter = new TimestampAdapter();

	/**
	 * Find all Nure groups
	 *
	 * @example Example usage:
	 * ```typescript
	 const group = await nurekit.groups.findMany()
	 * ```
	 *
	 * @returns an array of group objects
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/groups-endpoint/#findmany)
	 *
	 * @publicApi
	 */
	public async findMany(): Promise<IGroup[]> {
		return axiosClient
			.get<IGroup[]>("lists/groups")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	/**
	 * Find a group by name
	 *
	 * @example Example usage:
	 * ```typescript
	 const group = await nurekit.groups.findOne("пзпі-23-5")
	 * ```
	 *
	 * @param name name of group you want to get info about
	 * @returns a group object
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/groups-endpoint/#findone)
	 *
	 * @publicApi
	 */
	public async findOne(name: string): Promise<IGroup> {
		const groups = await this.findMany();

		const group = groups.find(
			(group) => group.name.toLowerCase() === name.toLowerCase(),
		);

		if (!group) {
			throw new Error("Group with such name doesn't exist");
		}

		return group;
	}

	/**
	 * Get group schedule
	 *
	 * @example Example usage:
	 * ```typescript
	 const schedule = await nurekit.groups.getSchedule({
  	  groupName: "пзпі-23-5",
  	  startTime: "2023-09-11",
  	  endTime: "2023-09-15",
	});
	 * ```
	 *
	 * @param groupName name of group you want to get schedule for
	 * @param startTime beginning of the time period for which the schedule is to be retrieved
	 * @param endTime end of the time period for which the schedule is to be retrieved
	 * @returns an array of subjects that for specific group
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/groups-endpoint/#getschedule)
	 *
	 * @publicApi
	 */
	public async getSchedule({
		groupName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { id: groupId } = await this.findOne(groupName);

		const timestamps = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		const params = getScheduleParams(timestamps);

		const schedule = await axiosClient.get<ISchedule[]>(
			`/schedule/groups/${groupId}`,
			{ params },
		);

		console.log(
			schedule.config.baseURL,
			schedule.config.url,
			schedule.config.params,
		);

		return schedule.data;
	}
}
