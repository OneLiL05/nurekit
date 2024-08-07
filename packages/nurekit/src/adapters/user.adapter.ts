import { IRawUser, IShortSchedule, IUser } from "../index.js";
import { TypeAdapter } from "./type.adapter.js";

export class UserAdapter {
	#typeAdapter = new TypeAdapter();

	public convert({ id, Email, UserName, Schedules }: IRawUser): IUser {
		const schedules: IShortSchedule[] = Schedules.map((rawSchedule) => {
			const { type, ...rest } = JSON.parse(rawSchedule);

			return {
				...rest,
				type: this.#typeAdapter.fromRaw(type),
			};
		});

		const user = {
			id: id,
			email: Email,
			username: UserName,
			schedules,
		};

		return user;
	}
}
