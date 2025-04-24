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
		.formatters.brackets.byWeekday()
		.formatters.brackets.toBar({seriesName: ["Number of players"], minY: 0});

	let barChartData = db.get<IBarChartData>();

	return (
		<>
			<BarChart title="📅️ Number of players by weekday" yAxisName="Number of players" chartData={barChartData}/>
			<TransfersInfo db={db}/>
		</>
	);
}
