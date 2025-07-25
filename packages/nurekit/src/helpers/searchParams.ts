import { ScheduleQueryParams } from "../types/index.js";

export const getScheduleParams = ({
	start,
	end,
	filters,
}: ScheduleQueryParams): URLSearchParams => {
	const params = new URLSearchParams({
		startedAt: start.toString(),
		endedAt: end.toString(),
	});

	if (filters) {
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && Array.isArray(value)) {
				params.append(`filters[${key}]`, value.join(","));
			}
		});
	}

	return params;
};
