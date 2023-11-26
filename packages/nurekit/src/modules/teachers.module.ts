import { TimestampAdapter } from "../adapters/timestamp.adapter.js";
import { handleAxiosError } from "../helpers/axios.helper.js";
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
		return await axiosClient
			.get<ITeacher[]>("/teachers")
			.then((res) => res.data)
			.catch(handleAxiosError);
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
			return teacher.ShortName === shortName;
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
	 *  Id: number;
	 *  StartTime: number;
	 *  EndTime: number;
	 *  Auditory: string;
	 *  NumberPair: number;
	 *  Type: string;
	 *  Groups: {
	 *    Id: number;
	 *    Name: string;
	 *  }[];
	 *  Teachers: {
	 *    Id: number;
	 *    FullName: string;
	 *    ShortName: string;
	 *  }[];
	 *  Subject: {
	 *    Id: number;
	 *    Brief: string;
	 *    Title: string;
	 *  };
	 *}[]
	 * ```
	 *
	 * Example usage:
	 * ```typescript
	 const schedule = await nurekit.teachers.getSchedule({
  	  teacherName: "Боцюра О. А.",
  	  startTime: "2023-09-11",
  	  endTime: "2023-09-15",
	});
	 * ```
	 *
	 * @param teacherName short name of a teacher you want to get schedule for
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
	}: GetScheduleParams): Promise<ISchedule[]> {
		const { Id: teacherId } = await this.findOne(teacherName);

		const { startTimestamp, endTimestamp } = this.#timestampAdapter.convert({
			startTime,
			endTime,
		});

		return await axiosClient
			.get<ISchedule[]>(
				`/schedule?type=teacher&id=${teacherId}&start_time=${startTimestamp}&end_time=${endTimestamp}`,
			)
			.then((res) => res.data)
	}
}
