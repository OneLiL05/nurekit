import { IRawSchedule, ISchedule } from "../index.js";
import { transformTeachers } from "./teachers.helper.js";

export function transformSchedule(rawSchedule: IRawSchedule[]): ISchedule[] {
	const transformedSchedule: ISchedule[] = [];

	for (let subject of rawSchedule) {
		const { end_time, start_time, teachers, number_pair, auditory, ...rest } = subject;

		transformedSchedule.push({
			...rest,
			endTime: end_time,
			startTime: start_time,
			teachers: transformTeachers(teachers),
			numberPair: number_pair,
			auditorium: auditory,
		});
	}

	return transformedSchedule;
}
