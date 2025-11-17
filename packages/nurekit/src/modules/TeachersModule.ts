import { NurekitError } from "../errors.js";
import {
	Auditorium,
	Group,
	Subject,
	Teacher,
	TeacherScheduleFilters,
} from "../types/index.js";
import { ApiResponseMultiple, TeachersModule } from "../types/modules.js";
import { BaseModuleImpl } from "./BaseModule.js";

export class TeachersModuleImpl
	extends BaseModuleImpl<Teacher, TeacherScheduleFilters>
	implements TeachersModule
{
	constructor(baseUrl: string) {
		super(`${baseUrl}/teachers`);
	}

	async getAuditoriums(teacherId: number): Promise<Auditorium[]> {
		const url = `${this.baseUrl}/${teacherId}/auditoriums`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Auditorium> = await response.json();

		return data.data;
	}

	async getGroups(teacherId: number): Promise<Group[]> {
		const url = `${this.baseUrl}/${teacherId}/groups`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Group> = await response.json();

		return data.data;
	}

	async getSubjects(teacherId: number): Promise<Subject[]> {
		const url = `${this.baseUrl}/${teacherId}/subjects`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Subject> = await response.json();

		return data.data;
	}
}
