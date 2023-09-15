import { IRawSchedule, ISchedule } from "../index.js";
import { transformTeachers } from "./teachers.helper.js";

export function transformSchedule(rawSchedule: IRawSchedule[]): ISchedule[] {
	return rawSchedule.map((rawSchedule) => {
		const { end_time, start_time, teachers, number_pair, auditory, ...rest } =
			rawSchedule;

		return {
			...rest,
			endTime: end_time,
			startTime: start_time,
			teachers: transformTeachers(teachers),
			numberPair: number_pair,
			auditorium: auditory,
		};
	});
}
