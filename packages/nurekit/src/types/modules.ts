import {
	Auditorium,
	AuditoriumScheduleFilters,
	CreateLink,
	CreateSharableLink,
	GetScheduleParams,
	Group,
	GroupScheduleFilters,
	Link,
	Schedule,
	SharableLink,
	Subject,
	Teacher,
	TeacherScheduleFilters,
	UpdateLink,
} from "./index.js";

type ApiResponseMultiple<T> = {
	success: true;
	data: T[];
	message: string;
	error: null;
};

type ApiResponseSingle<T> = {
	success: true;
	data: T;
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

interface LinksModule {
	getUserLinks: () => Promise<Link[]>;
	createLink: (data: CreateLink) => Promise<Link>;
	updateLink: (linkId: string, data: UpdateLink) => Promise<Link>;
	deleteLink: (linkId: string) => Promise<Link>;
}

interface SharableLinksModule {
	getLink: (linkId: string) => Promise<SharableLink>;
	createLink: (data: CreateSharableLink) => Promise<{ id: string }>;
	acceptLink: (linkId: string) => Promise<void>;
}

export type {
	AuditoriumsModule,
	BaseModule,
	GroupsModule,
	TeachersModule,
	LinksModule,
	ApiResponseMultiple,
	ApiResponseSingle,
	SharableLinksModule,
};
