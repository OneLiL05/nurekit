import { handleAxiosError } from "../helpers/axios.helper.js";
import { toTimestamp } from "../helpers/date.helper.js";
import { transformSchedule } from "../helpers/schedule.helper.js";
import { transformTeachers } from "../helpers/teachers.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IRawSchedule, IRawTeacher, ITeacher } from "../types/index.js";

interface GetScheduleParams {
	teacherName: string;
	startTime: string;
	endTime: string;
}

export class TeachersModule {
	/**
	 * Method returns array of objects with such fields:
	 * ```typescript
	 * {
	 *   id: number;
	 *   fullName: string;
	 *   shortName: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const teachers = await nurekit.teachers.findMany()
	 * ```
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-teachers)
	 *
	 * @publicApi
	 */
	public async findMany(): Promise<ITeacher[]> {
		const rawTeachers = await axiosClient
			.get<IRawTeacher[]>("/api/teachers")
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformTeachers(rawTeachers);

		return result;
	}

	/**
	 * Method returns object with such fields:
	 * ```typescript
	 * {
	 *   id: number;
	 *   fullName: string;
	 *   shortName: string;
	 * }
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const teacher = await nurekit.teachers.findOne("Боцюра О. А.")
	 * ```
	 *
	 * @param shortName short name of teacher you want to get info about
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-teachers	)
	 *
	 * @publicApi
	 */
	public async findOne(shortName: string): Promise<ITeacher> {
		const teachers = await this.findMany();

		const teacher = teachers.find((teacher) => {
			teacher.shortName === shortName;
		});

		if (!teacher) {
			throw new Error("Teacher with such shortName doesn't exist");
		}

		return teacher;
	}

	/**
	 * Method returns schedule:
	 * ```typescript
	 *{
	 *  id: number;
	 *  startTime: number;
	 *  endTime: number;
	 *  auditorium: string;
	 *  numberPair: number;
	 *  type: string;
	 *  updatedAt: Date;
	 *  groups: {
	 *    id: number;
	 *    name: string;
	 *  }[];
	 *  teachers: {
	 *    id: number;
	 *    fullName: string;
	 *    shortName: string;
	 *  }[];
	 *  subject: {
	 *    id: number;
	 *    brief: string;
	 *    title: string;
	 *  };
	 *}[]
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const schedule = await nurekit.teachers.getSchedule({
  	  auditoriumName: "Боцюра О. А.",
  	  startTime: "2023-09-11",
  	  endTime: "2023-09-15",
	});
	 * ```
	 *
	 * @param teacherName name of a teacher you want to get schedule for
	 * @param startTime
	 * @param endTime
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-schedule)
	 *
	 * @publicApi
	 */
	public async getSchedule({
		teacherName,
		startTime,
		endTime,
	}: GetScheduleParams) {
		const { id: teacherId } = await this.findOne(teacherName);

		const startTimestamp = toTimestamp(startTime);
		const endTimestamp = toTimestamp(endTime);

		const rawSchedule = await axiosClient
			.get<IRawSchedule[]>(
				`/api/schedule?type=teacher&id=${teacherId}&start_time=${startTimestamp}&end_time=${endTimestamp}`,
			)
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformSchedule(rawSchedule);

		return result;
	}
}
