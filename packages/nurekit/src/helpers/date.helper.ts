export function toTimestamp(stringDate: string) {
	const parsedDate = Date.parse(stringDate);

	return parsedDate / 1000;
}
