import DB from "@/db/DB";

export default class BracketsFormatters {
	db!: DB;

	constructor(db: DB) {
		this.db = db;
	}

	byAge(): DB {
		const brackets: Record<string, number> = {};

		// Group transfers by age
		for (const t of this.db.data) {
			const age = t.age;
			const label = `${age}`;
			brackets[label] = brackets[label] ? brackets[label] + 1 : 1;
		}

		this.db.data = brackets;
		return this.db;
	}

	bySS(): DB {
		let brackets: Record<string, number> = {
			"0-20": 0,
			"21-40": 0,
			"41-50": 0,
			"51-60": 0,
			"61-70": 0,
			"71-80": 0,
			"80+": 0,
		};

		// Group transfers by skill bracket
		for (const t of this.db.data) {
			const ss = t.all_skills;

			switch (true) {
				case ss <= 20:
					brackets["0-20"]++; // "0-20"
					break;
				case ss > 20 && ss <= 40:
					brackets["21-40"]++; // "21-40"
					break;
				case ss > 40 && ss <= 50:
					brackets["41-50"]++; // "41-50"
					break;
				case ss > 50 && ss <= 60:
					brackets["51-60"]++; // "51-60"
					break;
				case ss > 60 && ss <= 70:
					brackets["61-70"]++; // "61-70"
					break;
				case ss > 70 && ss <= 80:
					brackets["71-80"]++; // "71-80"
					break;
				default:
					brackets["80+"]++;
			}
		}
		this.db.data = brackets;
		return this.db;
	}

	byHeight(): DB {
		let brackets: { [height: number]: number } = {};
		this.db.data.forEach(({height}: ITransfer) => {
			if (!brackets[height]) brackets[height] = 0;
			brackets[height] += 1;
		});
		this.db.data = brackets;
		return this.db;
	}

	byWeekday(): DB {
		let brackets: Record<TWeekday, number> = {Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0};

		this.db.data.forEach((transfer: ITransfer) => {
			const date = new Date(transfer.transfer_date);
			const weekday = date.toLocaleDateString("en-US", {weekday: "short"}) as TWeekday; // Get weekday name (e.g. "Tuesday")
			brackets[weekday] += 1;
		});
		this.db.data = brackets;
		return this.db;
	}

	toPIE(): DB {
		const entries: [string, number][] = Object.entries(this.db.data);
		this.db.data = entries.map(([name, value]) => ({name, value})).filter(({value}) => value > 0);
		return this.db;
	}

	toLine({seriesName, minY}: { seriesName?: string[]; minY?: number }): DB {
		// TODO: Object.values(this.db.data) can be nested array for multiple lines
		let values: (number | number[])[] = Object.values(this.db.data);
		// @ts-ignore
		const maxY = Math.max.apply(null, values);
		// const isNestedArray = values.some(value => Array.isArray(value));
		this.db.data = {
			series: [
				{
					name: seriesName?.[0] || "-",
					type: "line",
					data: values,
					smooth: true,
					symbol: "none",
				},
			],
			xAxisData: Object.keys(this.db.data),
			// @ts-ignore
			minY: minY !== undefined ? minY : Math.min.apply(null, values),
			maxY: Math.round(maxY + maxY * 0.1), // +10%
		};
		return this.db;
	}

	toBar({seriesName, minY}: { seriesName?: string[]; minY?: number }): DB {
		this.toLine({seriesName, minY}); // Same logic
		return this.db;
	}
}
