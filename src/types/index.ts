interface IRawTeacher {
	id: number;
	full_name: string;
	short_name: string;
}

interface ITeacher {
	id: number;
	fullName: string;
	shortName: string;
}

interface IGroup {
	id: number;
	name: string;
}

interface IAuditory extends IGroup {}

interface ISubject {
	id: number;
	brief: string;
	title: string;
}

interface ISchedule {
	id: number;
	start_time: number;
	end_time: number;
	auditory: number;
	number_pair: number;
	type: string;
	updatedAt: Date;
	groups: IGroup[];
	teachers: IRawTeacher[];
	subject: ISubject;
}

export type { IRawTeacher, ITeacher, IGroup, IAuditory, ISubject, ISchedule };
