interface IGroup {
	id: number;
	name: string
}

interface IAuditorium extends IGroup {}

interface ITeacher {
	id: number;
	fullName: string;
	shortName: string;
}

interface ISubject {
	id: number;
	brief: string;
	title: string;
}

interface ISchedule {
	id: number;
	startTime: number;
	endTime: number;
	auditory: string;
	numberPair: number;
	type: string;
	groups: IGroup[];
	teachers: ITeacher[];
	subject: ISubject;
}

export type {
	ITeacher,
	IGroup,
	IAuditorium,
	ISubject,
	ISchedule,
};
