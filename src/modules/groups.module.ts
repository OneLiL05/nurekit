import { handleAxiosError } from "../helpers/axios.helper.js";
import { transformSchedule } from "../helpers/schedule.helper.js";
import { IGroup, IRawSchedule, ISchedule } from "../index.js";
import { axiosClient } from "../libs/axios.js";

interface FindOneParams {
	name: string;
}

interface GetScheduleParams {
	groupName: string;
	startTime: number;
	endTime: number;
}

export class GroupsModule {
	public async findMany(): Promise<IGroup[]> {
		return axiosClient
			.get<IGroup[]>("/api/groups")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	public async findOne({ name }: FindOneParams): Promise<IGroup> {
		const groups = await this.findMany();

		const group = groups.find((group) => group.name === name.toUpperCase());

		if (!group) {
			throw new Error("Group with such name doesn't exist");
		}

		return group;
	}

	public async getSchedule({
		groupName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { id: groupId } = await this.findOne({ name: groupName });

		const rawSchedule = await axiosClient
			.get<IRawSchedule[]>(
				`/api/schedule?type=group&id=${groupId}&start_time=${startTime}&end_time=${endTime}`,
			)
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformSchedule(rawSchedule);

		return result;
	}
}
