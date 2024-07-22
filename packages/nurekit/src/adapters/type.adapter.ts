import { TRawShortScheduleType, TShortScheduleType } from "../types/index.js";

export class TypeAdapter {
	public toRaw(type: TShortScheduleType): TRawShortScheduleType {
		switch (type) {
			case "auditoriums":
				return "auditory";
			case "groups":
				return "group";
			case "teachers":
				return "teacher";
		}
	}

	public fromRaw(type: TRawShortScheduleType): TShortScheduleType {
		switch (type) {
			case "auditory":
				return "auditoriums";
			case "group":
				return "groups";
			case "teacher":
				return "teachers";
		}
	}
}
