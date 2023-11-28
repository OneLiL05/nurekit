import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
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
			.get<IGroup[]>("/groups")
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
	 const group = await nurekit.groups.findOne("пзпі-23-5")
	 * ```
	 *
	 * @param name name of group you want to get info about
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-a-group)
	 *
	 * @publicApi
	 */
	public async findOne(name: string): Promise<IGroup> {
		const groups = await this.findMany();

		const group = groups.find((group) => group.name.toLowerCase() === name.toLowerCase());

		if (!group) {
			throw new Error("Group with such name doesn't exist");
		}

		return group;
	}

	/**
	 * Method returns schedule:
	 * ```typescript
	 *{
	 *  id: number;
	 *  startTime: number;
	 *  endTime: number;
	 *  auditory: string;
	 *  numberPair: number;
	 *  type: string;
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
		const { id: groupId } = await this.findOne(groupName);

		const { startTimestamp, endTimestamp } = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		const schedule = await axiosClient
			.get<ISchedule[]>(
				`/schedule?type=group&id=${groupId}&start_time=${startTimestamp}&end_time=${endTimestamp}`,
			)
			.then((res) => res.data)

		return schedule;
	}
}
