interface Group {
	id: number;
	name: string;
}

interface Auditorium extends Group {}

interface Teacher {
	id: number;
	fullName: string;
	shortName: string;
}

interface Subject {
	id: number;
	brief: string;
	title: string;
}

interface Schedule {
	id: number;
	startedAt: number;
	endedAt: number;
	auditorium: Auditorium;
	numberPair: number;
	type: string;
	groups: Group[];
	teachers: Teacher[];
	subject: Subject;
}

interface GetScheduleParams {
	id: number;
	startedAt: number;
	endedAt: number;
}

type ScheduleType = "groups" | "auditoriums" | "teachers";

interface ShortSchedule {
	name: string;
	id: number;
	type: ScheduleType;
}

interface TimeInterval {
	start: string;
	end: string;
}

export type {
	Teacher,
	Group,
	Auditorium,
	Subject,
	Schedule,
	ShortSchedule,
	TimeInterval,
	GetScheduleParams,
};
