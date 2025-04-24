import { makeAutoObservable } from "mobx";

class FiltersModel {
	limit: number = 1000000;
	transfersFromMs: number = 0;
	transfersToMs: number = 0;
	transfersCurrentFromMs: number = 0;
	transfersCurrentToMs: number = 0;
	transfersMinSS: number = 0;
	transfersMaxSS: number = 100;
	minPrice: number = 10000;
	maxPrice: number = 46875000; // 300 mln UAH
	selectedAges: number[] = [16, 25, 30];
	ages = Array.from({ length: 40 - 16 + 1 }, (_, i) => 16 + i);

	constructor() {
		makeAutoObservable(this);
	}

	get query(): string {
		return `?minPrice=${this.minPrice}
				&maxPrice=${this.maxPrice}
				&limit=${this.limit}
				&transfersCurrentFromMs=${this.transfersCurrentFromMs}
				&transfersCurrentToMs=${this.transfersCurrentToMs}
				&transfersMinSS=${this.transfersMinSS}
				&transfersMaxSS=${this.transfersMaxSS}
				&selectedAges=${(this.selectedAges.includes(999) ? this.selectedAges : this.selectedAges).join(",")}`;
	}

	update(updates: Partial<IFilters>) {
		Object.keys(updates).forEach(key => {
			const typedKey = key as keyof IFilters;
			if (updates[typedKey] !== undefined) {
				(this[typedKey] as any) = updates[typedKey];
			}
		});
	}
}

export default FiltersModel;
