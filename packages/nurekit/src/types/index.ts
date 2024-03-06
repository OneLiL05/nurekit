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

interface IAuthData {
	email: string;
	password: string;
}

interface ITokens {
	accessToken: string
	refreshToken: string
}

type TRawShortScheduleType = "group" | "auditory" | "teacher"

type TShortScheduleType = "groups" | "auditoriums" | "teachers"

interface IShortSchedule {
	name: string;
	id: number;
	type: TShortScheduleType;
}

interface IRawUser {
	Id: string;
	UserName: string;
	Email: string;
	Schedules: string[];
}

interface IUser {
	id: string;
	username: string;
	email: string;
	schedules: IShortSchedule[];
}

export type {
	ITeacher,
	IGroup,
	IAuditorium,
	ISubject,
	ISchedule,
	IAuthData,
	ITokens,
	IShortSchedule,
	TShortScheduleType,
	IRawUser,
	IUser,
	TRawShortScheduleType,
};
