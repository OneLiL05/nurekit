import { handleAxiosError } from "../helpers/axios.helper.js";
import { transformTeachers } from "../helpers/teachers.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IRawTeacher, ITeacher } from "../types/index.js";

interface FindOneParams {
	shortName: string;
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
	 const teacher = await nurekit.teachers.findOne({ shortName: "Боцюра О. А." })
	 * ```
	 *
	 * @param shortName short name of teacher you want to get info about
	 *
	 * @see [Docs](https://github.com/OneLiL05/nurekit#get-teachers	)
	 *
	 * @publicApi
	 */
	public async findOne({ shortName }: FindOneParams): Promise<ITeacher> {
		const teachers = await this.findMany();

		const teacher = teachers.find((teacher) => {
			teacher.shortName === shortName;
		});

		if (!teacher) {
			throw new Error("Teacher with such shortName doesn't exist");
		}

		return teacher;
	}
}
