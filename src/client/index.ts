import { transformTeachers } from "../helpers/teachers.helper.js";
import {
	ITeacher,
	IRawTeacher,
	IGroup,
	IAuditory,
	ISchedule,
} from "../types/index.js";
import { axiosClient } from "../libs/axios.js";

interface GetScheduleParams {
	groupName: string;
	startTime: number;
	endTime: number;
}

export class Nurekit {
	public async getTeachers(): Promise<ITeacher[]> {
		const rawTeachers = await axiosClient
			.get<IRawTeacher[]>("/api/teachers")
			.then((res) => res.data);

		const result = transformTeachers(rawTeachers);

		return result;
	}

	public async getGroups(): Promise<IGroup[]> {
		return axiosClient.get<IGroup[]>("/api/groups").then((res) => res.data);
	}

	public async getAuditories(): Promise<IAuditory[]> {
		return axiosClient
			.get<IAuditory[]>("/api/auditories")
			.then((res) => res.data);
	}

	public async getSchedule({
		groupName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule> {
		const { id: groupId } = await this.#getGroup(groupName.toUpperCase());

		return axiosClient
			.get<ISchedule>(
				`/api/schedule?type=group&id=${groupId}&start_time=${startTime}&end_time=${endTime}`,
			)
			.then((res) => res.data);
	}

	async #getGroup(name: string): Promise<IGroup> {
		const groups = await this.getGroups();

		const group = groups.find((group) => group.name === name);

		if (!group) {
			throw new Error("Группи з такою назвою не існує");
		}

		return group;
	}
}
