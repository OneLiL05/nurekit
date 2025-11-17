import { NurekitError } from "../errors.js";
import { CreateLink, Link, UpdateLink } from "../types/index.js";
import {
	ApiResponseMultiple,
	ApiResponseSingle,
	LinksModule,
} from "../types/modules.js";

export class LinksModuleImpl implements LinksModule {
	private readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async getUserLinks(): Promise<Link[]> {
		const response = await fetch(`${this.baseUrl}/links`, {
			credentials: "include",
		});

		if (!response.ok) {
			throw new NurekitError("Failed to fetch user links", response.status);
		}

		const data: ApiResponseMultiple<Link> = await response.json();

		return data.data;
	}

	async createLink(data: CreateLink): Promise<Link> {
		const response = await fetch(`${this.baseUrl}/links`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new NurekitError("Failed to create link", response.status);
		}

		const responseData: ApiResponseSingle<Link> = await response.json();

		return responseData.data;
	}

	async updateLink(linkId: string, data: UpdateLink): Promise<Link> {
		const response = await fetch(`${this.baseUrl}/links/${linkId}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new NurekitError("Failed to update link", response.status);
		}

		const responseData: ApiResponseSingle<Link> = await response.json();

		return responseData.data;
	}

	async deleteLink(linkId: string): Promise<Link> {
		const response = await fetch(`${this.baseUrl}/links/${linkId}`, {
			method: "DELETE",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new NurekitError("Failed to delete link", response.status);
		}

		const responseData: ApiResponseSingle<Link> = await response.json();

		return responseData.data;
	}
}
