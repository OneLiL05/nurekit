import { AuditoriumsModule } from "./modules/auditoriums.module.js";
import { GroupsModule } from "./modules/groups.module.js";
import { TeachersModule } from "./modules/teachers.module.js";

export class Nurekit {
	public auditoriums = new AuditoriumsModule();
	public groups = new GroupsModule();
	public teachers = new TeachersModule();
}
