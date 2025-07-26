import { NurekitError } from "../index.js";
import {
	Auditorium,
	AuditoriumScheduleFilters,
	Group,
	Subject,
	Teacher,
} from "../types/index.js";
import { ApiResponse, AuditoriumsModule } from "../types/modules.js";
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

		const data: ApiResponse<Group> = await response.json();

		return data.data;
	}

	async getTeachers(auditoriumId: number): Promise<Teacher[]> {
		const url = `${this.baseUrl}/${auditoriumId}/teachers`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponse<Teacher> = await response.json();

		return data.data;
	}

	async getSubjects(auditoriumId: number): Promise<Subject[]> {
		const url = `${this.baseUrl}/${auditoriumId}/subjects`;

		const response = await fetch(url);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponse<Subject> = await response.json();

		return data.data;
	}
}
