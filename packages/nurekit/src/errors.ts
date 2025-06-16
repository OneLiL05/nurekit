export class NurekitError extends Error {
	status: number;

	constructor(message: string = "Something went wrong", status: number = 500) {
		super(`NurekitError: ${status} ${message}`);

		this.name = "NurekitError";
		this.message = message;
		this.status = status;
	}
}
