import { GetScheduleParams, Schedule } from "./index.js";

type ApiResponse<T> = {
	success: true;
	data: T[];
	message: string;
	error: null;
};

interface BaseModule<T extends object> {
	findMany: () => Promise<T[]>;
	getSchedule: (params: GetScheduleParams) => Promise<Schedule[]>;
}

export type { BaseModule, ApiResponse };
