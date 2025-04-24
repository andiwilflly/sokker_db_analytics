import TransfersInfo from "@/components/TransfersInfo.component";
import DB from "@/db/DB";
import LineChart from "@/components/charts/LineChart.component";

export default async function AgePieChartServer({
	                                                searchParams,
                                                }: {
	searchParams: Promise<IFilters>;
}) {
	const filters = await searchParams;

	const db = new DB()
		.getFromToRange()
		.getTransfers(filters)
		.formatters.brackets.byHeight()
		.formatters.brackets.toLine({seriesName: ["Price"]});

	let barChartData = db.get<ILineChartData>();
	barChartData.xAxisData = barChartData.xAxisData.map(height => `${height} cm`);

	console.log(db.transfers);

	return (
		<>
			<LineChart title="💰 Price of strikers by skill summ" yAxisName="Price" chartData={barChartData}/>
			<TransfersInfo db={db}/>
		</>
	);
}
