export {};

declare global {
	interface IBarChartData {
		series: {
			name: string;
			type: "bar";
			data: (number | number[])[];
		}[];
		xAxisData: (string | number)[];
		minY: number;
		maxY: number;
	}
}

