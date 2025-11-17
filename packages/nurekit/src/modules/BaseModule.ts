import { NurekitError } from "../errors.js";
import { getScheduleParams } from "../helpers/searchParams.js";
import { GetScheduleParams, Schedule } from "../types/index.js";
import { BaseModule, ApiResponseMultiple } from "../types/modules.js";

export class BaseModuleImpl<TEntity extends object, TFilters extends object>
	implements BaseModule<TEntity, TFilters>
{
	protected readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async findMany(): Promise<TEntity[]> {
		const response = await fetch(this.baseUrl);

		if (!response.ok) {
			throw new NurekitError();
		}

		const data: ApiResponseMultiple<TEntity> = await response.json();

		return data.data;
	}

	async getSchedule({
		id,
		startedAt,
		endedAt,
		filters,
	}: GetScheduleParams<TFilters>): Promise<Schedule[]> {
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

		const data: ApiResponseMultiple<Schedule> = await response.json();

		return data.data;
	}
}
