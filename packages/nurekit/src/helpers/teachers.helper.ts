import { IRawTeacher, ITeacher } from "../types/index.js";

function transformTeachers(rawTeachers: IRawTeacher[]): ITeacher[] {
	const transformedTeachers: ITeacher[] = []

	for (let teacher of rawTeachers) {
		transformedTeachers.push({
			id: teacher.id,
			fullName: teacher.full_name,
			shortName: teacher.short_name,
		})
	}

	return transformedTeachers;
}

export { transformTeachers };
