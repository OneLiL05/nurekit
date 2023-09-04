import { handleAxiosError } from "../helpers/axios.helper.js";
import { transformTeachers } from "../helpers/teachers.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IRawTeacher, ITeacher } from "../types/index.js";

interface FindOneParams {
	shortName: string;
}

export class TeachersModule {
	public async findMany(): Promise<ITeacher[]> {
		const rawTeachers = await axiosClient
			.get<IRawTeacher[]>("/api/teachers")
			.then((res) => res.data)
			.catch(handleAxiosError);

		const result = transformTeachers(rawTeachers);

		return result;
	}

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
