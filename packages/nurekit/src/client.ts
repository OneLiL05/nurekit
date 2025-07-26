import { AuditoriumsModuleImpl } from "./modules/AuditoriumsModule.js";
import { GroupsModuleImpl } from "./modules/GroupsModule.js";
import { TeachersModuleImpl } from "./modules/TeachersModule.js";
import {
	AuditoriumsModule,
	GroupsModule,
	TeachersModule,
} from "./types/modules.js";

export class Nurekit {
	readonly auditoriums: AuditoriumsModule;
	readonly groups: GroupsModule;
	readonly teachers: TeachersModule;

	constructor(baseUrl: string = "https://sh.mindenit.org/api") {
		this.auditoriums = new AuditoriumsModuleImpl(baseUrl);
		this.groups = new GroupsModuleImpl(baseUrl);
		this.teachers = new TeachersModuleImpl(baseUrl);
	}
}
