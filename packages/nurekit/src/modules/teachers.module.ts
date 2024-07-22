import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
import { getScheduleParams } from "../helpers/searchParams.helper.js";
import { axiosClient } from "../libs/axios.js";
import { ISchedule, ITeacher } from "../types/index.js";

interface GetScheduleParams {
	teacherName: string;
	startTime: string;
	endTime: string;
}

export class TeachersModule {
	#timestampAdapter = new TimestampAdapter();

	/**
	 * Find all Nure teachers
	 *
	 * @returns an array of teacher objects
	 *
	 * @example Example usage:
	 * ```typescript
	 const teachers = await nurekit.teachers.findMany()
	 * ```
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/teachers-endpoint/#findmany)
	 *
	 * @publicApi
	 */
	public async findMany(): Promise<ITeacher[]> {
		return await axiosClient
			.get<ITeacher[]>("lists/teachers")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	/**
	 * Get a teacher object by shortName
	 *
	 * @param shortName short name of teacher you want to get info about
	 * @returns a teacher object
	 *
	 * @example Example usage:
	 * ```typescript
	 const teacher = await nurekit.teachers.findOne("Боцюра О. А.")
	 * ```
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/teachers-endpoint/#findone)
	 *
	 * @publicApi
	 */
	public async findOne(shortName: string): Promise<ITeacher> {
		const teachers = await this.findMany();

		const teacher = teachers.find((teacher) => {
			return teacher.shortName === shortName;
		});

		if (!teacher) {
			throw new Error("Teacher with such shortName doesn't exist");
		}

		return teacher;
	}

	/**
	 * Method returns schedule:
	 *
	 * @param teacherName short name of a teacher you want to get schedule for
	 * @param startTime beginning of the time period for which the schedule is to be retrieved
	 * @param endTime end of the time period for which the schedule is to be retrieved
	 * @returns an array of subject for teacher
	 *
	 * @example Example usage:
	 * ```typescript
	 const schedule = await nurekit.teachers.getSchedule({
  	  teacherName: "Боцюра О. А.",
  	  startTime: "2023-09-11",
  	  endTime: "2023-09-15",
	});
	 * ```
	 *
	 * @see [Docs](https://onelil05.github.io/nurekit/reference/teachers-endpoint/#getschedule)
	 *
	 * @publicApi
	 */
	public async getSchedule({
		teacherName,
		startTime,
		endTime,
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { id: teacherId } = await this.findOne(teacherName);

		const timestamps = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		const params = getScheduleParams(timestamps);

		const schedule = await axiosClient.get<ISchedule[]>(
			`/schedule/teachers/${teacherId}`,
			{ params },
		);

		return schedule.data;
	}
}
