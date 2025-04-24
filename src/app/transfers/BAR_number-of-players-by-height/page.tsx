import TransfersInfo from "@/components/TransfersInfo.component";
import BarChart from "@/components/charts/BarChart.component";
import DB from "@/db/DB";

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
		.formatters.brackets.toBar({seriesName: ["Number of players"]});

	let barChartData = db.get<IBarChartData>();
	barChartData.xAxisData = barChartData.xAxisData.map(height => `${height} cm`);

	console.log(db.transfers);

	return (
		<>
			<BarChart title="↕️ Number of players by height" yAxisName="Number of players" chartData={barChartData}/>
			<TransfersInfo db={db}/>
		</>
	);
}
