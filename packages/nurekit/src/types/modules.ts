import {
	Auditorium,
	AuditoriumScheduleFilters,
	GetScheduleParams,
	Group,
	GroupScheduleFilters,
	Schedule,
	Subject,
	Teacher,
	TeacherScheduleFilters,
} from "./index.js";

type ApiResponse<T> = {
	success: true;
	data: T[];
	message: string;
	error: null;
};

interface BaseModule<TEntity extends object, TFilters extends object> {
	findMany: () => Promise<TEntity[]>;
	getSchedule: (params: GetScheduleParams<TFilters>) => Promise<Schedule[]>;
}

interface AuditoriumsModule
	extends BaseModule<Auditorium, AuditoriumScheduleFilters> {
	getGroups: (auditoriumId: number) => Promise<Group[]>;
	getTeachers: (auditoriumId: number) => Promise<Teacher[]>;
	getSubjects: (auditoriumId: number) => Promise<Subject[]>;
}

interface GroupsModule extends BaseModule<Group, GroupScheduleFilters> {
	getAuditoriums: (groupId: number) => Promise<Auditorium[]>;
	getTeachers: (groupId: number) => Promise<Teacher[]>;
	getSubjects: (groupId: number) => Promise<Subject[]>;
}

interface TeachersModule extends BaseModule<Teacher, TeacherScheduleFilters> {
	getAuditoriums: (teacherId: number) => Promise<Auditorium[]>;
	getGroups: (teacherId: number) => Promise<Group[]>;
	getSubjects: (teacherId: number) => Promise<Subject[]>;
}

export type {
	ApiResponse,
	AuditoriumsModule,
	BaseModule,
	GroupsModule,
	TeachersModule,
};
