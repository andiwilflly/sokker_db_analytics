import TransfersInfo from "@/components/TransfersInfo.component";
import PIEChart from "@/components/charts/PIEChart.component";
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
		.formatters.brackets.bySS()
		.formatters.brackets.toPIE();

	return (
		<>
			<PIEChart
				title="🎯 Transfer Distribution by Skill Bracket"
				legendFormatter="Sum skill {b}: {c} transfers ({d}%)"
				chartData={db.get<{ name: string; value: number }[]>()}
			/>
			<TransfersInfo db={db}/>
		</>
	);
}
