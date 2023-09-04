import { handleAxiosError } from "../helpers/axios.helper.js";
import { axiosClient } from "../libs/axios.js";
import { IAuditorium } from "../types/index.js";

interface FindOneParams {
	name: string;
}

export class AuditoriumsModule {
	public async findMany(): Promise<IAuditorium[]> {
		return axiosClient
			.get<IAuditorium[]>("/api/auditories")
			.then((res) => res.data)
			.catch(handleAxiosError);
	}

	public async findOne({ name }: FindOneParams): Promise<IAuditorium> {
		const auditoriums = await this.findMany();

		const auditorium = auditoriums.find(
			(auditorium) => auditorium.name === name,
		);

		if (!auditorium) {
			throw new Error("Auditorium with such 'name' doesn't exist");
		}

		return auditorium;
	}
}
