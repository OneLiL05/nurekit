type EventType = "Лк" | "Пз" | "Лб" | "Конс" | "Зал" | "Екз" | "КП/КР";

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

interface GroupScheduleFilters {
	lessonTypes: EventType[];
	teachers: number[];
	auditoriums: number[];
	subjects: number[];
}

interface TeacherScheduleFilters {
	lessonTypes: EventType[];
	groups: number[];
	auditoriums: number[];
	subjects: number[];
}

interface AuditoriumScheduleFilters {
	lessonTypes: EventType[];
	groups: number[];
	teachers: number[];
	subjects: number[];
}

interface GetScheduleParams<TFilters extends object> {
	id: number;
	startedAt: number;
	endedAt: number;
	filters?: Partial<TFilters>;
}

type ScheduleType = "groups" | "auditoriums" | "teachers";

interface ShortSchedule {
	name: string;
	id: number;
	type: ScheduleType;
}

interface ScheduleQueryParams<T extends object> {
	start: number;
	end: number;
	filters?: Partial<T>;
}

export type {
	Teacher,
	Group,
	Auditorium,
	Subject,
	Schedule,
	ShortSchedule,
	ScheduleQueryParams,
	GetScheduleParams,
	EventType,
	GroupScheduleFilters,
	TeacherScheduleFilters,
	AuditoriumScheduleFilters,
};
