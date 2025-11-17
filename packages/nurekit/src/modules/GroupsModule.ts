import { NurekitError } from "../errors.js";
import {
	Auditorium,
	Group,
	GroupScheduleFilters,
	Subject,
	Teacher,
} from "../types/index.js";
import { ApiResponseMultiple, GroupsModule } from "../types/modules.js";
import { BaseModuleImpl } from "./BaseModule.js";

export class GroupsModuleImpl
	extends BaseModuleImpl<Group, GroupScheduleFilters>
	implements GroupsModule
{
	constructor(baseUrl: string) {
		super(`${baseUrl}/groups`);
	}

	async getAuditoriums(groupId: number): Promise<Auditorium[]> {
		const url = `${this.baseUrl}/${groupId}/auditoriums`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Auditorium> = await response.json();

		return data.data;
	}

	async getTeachers(groupId: number): Promise<Teacher[]> {
		const url = `${this.baseUrl}/${groupId}/teachers`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Teacher> = await response.json();

		return data.data;
	}

	async getSubjects(groupId: number): Promise<Subject[]> {
		const url = `${this.baseUrl}/${groupId}/subjects`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Subject> = await response.json();

		return data.data;
	}
}
