export {};

declare global {
	interface ILineChartData {
		series: {
			name: string;
			type: "line";
			data: (number | number[])[];
			smooth: true;
			symbol: "none";
		}[];
		xAxisData: (string | number)[];
		minY: number;
		maxY: number;
	}
}
