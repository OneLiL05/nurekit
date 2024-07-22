import { AuditoriumsModule } from "./modules/auditoriums.module.js";
import { GroupsModule } from "./modules/groups.module.js";
import { TeachersModule } from "./modules/teachers.module.js";

export class Nurekit {
	auditoriums: AuditoriumsModule = new AuditoriumsModule();
	groups: GroupsModule = new GroupsModule();
	teachers: TeachersModule = new TeachersModule();
}
