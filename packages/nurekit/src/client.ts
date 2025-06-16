import { BaseModuleImpl } from "./modules/BaseModule.js";
import { Auditorium, Group, Teacher } from "./types/index.js";
import { BaseModule } from "./types/modules.js";

export class Nurekit {
	readonly auditoriums: BaseModule<Auditorium>;
	readonly groups: BaseModule<Group>;
	readonly teachers: BaseModule<Teacher>;

	constructor(baseUrl: string = "https://sh.mindenit.org/api") {
		this.auditoriums = new BaseModuleImpl(`${baseUrl}/auditoriums`);
		this.groups = new BaseModuleImpl(`${baseUrl}/groups`);
		this.teachers = new BaseModuleImpl(`${baseUrl}/teachers`);
	}
}
