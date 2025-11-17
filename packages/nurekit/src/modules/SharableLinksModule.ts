import { NurekitError } from "../errors.js";
import { CreateSharableLink, SharableLink } from "../types/index.js";
import { ApiResponseSingle, SharableLinksModule } from "../types/modules.js";

export class SharableLinksModuleImpl implements SharableLinksModule {
	private readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async getLink(linkId: string): Promise<SharableLink> {
		const response = await fetch(`${this.baseUrl}/sharable-links/${linkId}`);

		if (!response.ok) {
			throw new NurekitError("Failed to fetch sharable link", response.status);
		}

		const data: ApiResponseSingle<SharableLink> = await response.json();

		return data.data;
	}

	async createLink(data: CreateSharableLink): Promise<{ id: string }> {
		const response = await fetch(`${this.baseUrl}/sharable-links`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		if (!response.ok) {
			throw new NurekitError("Failed to create sharable link", response.status);
		}

		const responseData: ApiResponseSingle<{ id: string }> =
			await response.json();

		return responseData.data;
	}

	async acceptLink(linkId: string): Promise<void> {
		const response = await fetch(
			`${this.baseUrl}/sharable-links/${linkId}/accept`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			},
		);

		if (!response.ok) {
			throw new NurekitError("Failed to delete link", response.status);
		}
	}
}
