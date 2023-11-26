interface IGroup {
	Id: number;
	Name: string
}

interface IAuditorium extends IGroup {}

interface ITeacher {
	Id: number;
	FullName: string;
	ShortName: string;
}

interface ISubject {
	Id: number;
	Brief: string;
	Title: string;
}

interface ISchedule {
	Id: number;
	StartTime: number;
	EndTime: number;
	Auditory: string;
	NumberPair: number;
	Type: string;
	Groups: IGroup[];
	Teachers: ITeacher[];
	Subject: ISubject;
}

export type {
	ITeacher,
	IGroup,
	IAuditorium,
	ISubject,
	ISchedule,
};
