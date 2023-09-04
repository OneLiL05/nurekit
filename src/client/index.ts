import { transformTeachers } from "../helpers/teachers.helper.js";
import {
	ITeacher,
	IRawTeacher,
	IGroup,
	IAuditorium,
	ISchedule,
	IRawSchedule,
} from "../types/index.js";
import { axiosClient } from "../libs/axios.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
import { transformSchedule } from "../helpers/schedule.helper.js";

interface GetScheduleParams {
	groupName: string;
	startTime: number;
	endTime: number;
}

export class Nurekit {
	public async getTeachers(): Promise<ITeacher[]> {
		const rawTeachers = await axiosClient
			.get<IRawTeacher[]>("/api/teachers")
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformTeachers(rawTeachers);

		return result;
	}

	public async getGroups(): Promise<IGroup[]> {
		return axiosClient.get<IGroup[]>("/api/groups").then((res) => res.data);
	}

	public async getAuditoriums(): Promise<IAuditorium[]> {
		return axiosClient
			.get<IAuditorium[]>("/api/auditories")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	public async getSchedule({
		groupName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { id: groupId } = await this.#getGroup(groupName.toUpperCase());

		const rawSchedule = await axiosClient
			.get<IRawSchedule[]>(
				`/api/schedule?type=group&id=${groupId}&start_time=${startTime}&end_time=${endTime}`,
			)
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformSchedule(rawSchedule);

		return result;
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
