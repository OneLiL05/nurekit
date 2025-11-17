import { AuditoriumsModuleImpl } from "./modules/AuditoriumsModule.js";
import { GroupsModuleImpl } from "./modules/GroupsModule.js";
import { LinksModuleImpl } from "./modules/LinksModule.js";
import { SharableLinksModuleImpl } from "./modules/SharableLinksModule.js";
import { TeachersModuleImpl } from "./modules/TeachersModule.js";
import {
	AuditoriumsModule,
	GroupsModule,
	LinksModule,
	SharableLinksModule,
	TeachersModule,
} from "./types/modules.js";

export class Nurekit {
	readonly auditoriums: AuditoriumsModule;
	readonly groups: GroupsModule;
	readonly teachers: TeachersModule;
	readonly links: LinksModule;
	readonly sharableLinks: SharableLinksModule;

	constructor(baseUrl: string = "https://sh.mindenit.org/api") {
		this.auditoriums = new AuditoriumsModuleImpl(baseUrl);
		this.groups = new GroupsModuleImpl(baseUrl);
		this.teachers = new TeachersModuleImpl(baseUrl);
		this.links = new LinksModuleImpl(baseUrl);
		this.sharableLinks = new SharableLinksModuleImpl(baseUrl);
	}
}
