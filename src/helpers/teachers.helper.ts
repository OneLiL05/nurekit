import { IRawTeacher, ITeacher } from "../types/index.js";

function transformTeachers(rawTeachers: IRawTeacher[]): ITeacher[] {
	return rawTeachers.map((teacher) => {
		return {
			id: teacher.id,
			fullName: teacher.full_name,
			shortName: teacher.short_name,
		};
	});
}

export { transformTeachers };
