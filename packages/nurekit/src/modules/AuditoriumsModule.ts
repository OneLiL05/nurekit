import { NurekitError } from "../index.js";
import {
	Auditorium,
	AuditoriumScheduleFilters,
	Group,
	Subject,
	Teacher,
} from "../types/index.js";
import { ApiResponseMultiple, AuditoriumsModule } from "../types/modules.js";
import { BaseModuleImpl } from "./BaseModule.js";

export class AuditoriumsModuleImpl
	extends BaseModuleImpl<Auditorium, AuditoriumScheduleFilters>
	implements AuditoriumsModule
{
	constructor(baseUrl: string) {
		super(`${baseUrl}/auditoriums`);
	}

	async getGroups(auditoriumId: number): Promise<Group[]> {
		const url = `${this.baseUrl}/${auditoriumId}/groups`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Group> = await response.json();

		return data.data;
	}

	async getTeachers(auditoriumId: number): Promise<Teacher[]> {
		const url = `${this.baseUrl}/${auditoriumId}/teachers`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Teacher> = await response.json();

		return data.data;
	}

	async getSubjects(auditoriumId: number): Promise<Subject[]> {
		const url = `${this.baseUrl}/${auditoriumId}/subjects`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<Subject> = await response.json();

		return data.data;
	}
}
