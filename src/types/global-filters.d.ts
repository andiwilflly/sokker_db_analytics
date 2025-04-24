export {};

declare global {
	interface IFilters {
		limit?: number;
		transfersFromMs?: number;
		transfersToMs?: number;
		transfersCurrentFromMs?: number;
		transfersCurrentToMs?: number;
		transfersMinSS?: number;
		transfersMaxSS?: number;
		minPrice?: number;
		maxPrice?: number;
		selectedAges?: number[];
	}
}
