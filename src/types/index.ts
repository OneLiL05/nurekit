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

interface IAuditorium extends IGroup {}

interface ISubject {
	id: number;
	brief: string;
	title: string;
}

interface IRawSchedule {
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

interface ISchedule
	extends Omit<
		IRawSchedule,
		"start_time" | "end_time" | "number_pair" | "teachers" | "auditory"
	> {
	startTime: number;
	endTime: number;
	numberPair: number;
	teachers: ITeacher[];
	auditorium: number;
}

export type {
	IRawTeacher,
	ITeacher,
	IGroup,
	IAuditorium,
	ISubject,
	IRawSchedule,
	ISchedule,
};
