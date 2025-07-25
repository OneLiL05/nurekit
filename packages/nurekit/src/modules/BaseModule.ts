import { NurekitError } from "../errors.js";
import { getScheduleParams } from "../helpers/searchParams.js";
import { GetScheduleParams, Schedule } from "../types/index.js";
import { BaseModule, ApiResponse } from "../types/modules.js";

export class BaseModuleImpl<T extends object> implements BaseModule<T> {
	private readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async findMany(): Promise<T[]> {
		const response = await fetch(this.baseUrl);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponse<T> = await response.json();

		return data.data;
	}

	async getSchedule({
		id,
		startedAt,
		endedAt,
		filters,
	}: GetScheduleParams): Promise<Schedule[]> {
		const params = getScheduleParams({
			start: startedAt,
			end: endedAt,
			filters,
		});

		const url = new URL(`${this.baseUrl}/${id}/schedule`);

		url.search = params.toString();

		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponse<Schedule> = await response.json();

		return data.data;
	}
}
