import * as path from "node:path";
import BracketsFormatters from "@/db/formatters/Brackets.formatters";
import earliestTransferQuery from "@/db/query/earliestTransfer.query";
import latestTransferQuery from "@/db/query/latestTransfer.query";
import transfersQuery from "@/db/query/transfersQuery";
import Database from "better-sqlite3";

const dbPath = path.resolve(process.cwd(), "src/db/new_transfers.db");
const db = new Database(dbPath, {readonly: true});

export default class DB {
	data!: any;
	fromMs!: number;
	toMs!: number;
	transfers!: ITransfer[];

	formatters = {
		brackets: new BracketsFormatters(this),
	};

	getFromToRange(): DB {
		const earliestTransfer = db.prepare(earliestTransferQuery()).get() as ITransfer;
		const latestTransfer = db.prepare(latestTransferQuery()).get() as ITransfer;
		this.fromMs = new Date(`${earliestTransfer.transfer_date} ${earliestTransfer.transfer_time}`).getTime();
		this.toMs = new Date(`${latestTransfer.transfer_date} ${latestTransfer.transfer_time}`).getTime();
		return this;
	}

	getTransfers(filters: IFilters): DB {
		console.time("getTransfers");
		// Convert milliseconds (fromMs, toMs) to YYYY-MM-DD HH:MM:SS format
		const fromDateTime = new Date(+filters.transfersCurrentFromMs!).toISOString().slice(0, 19).replace("T", " ");
		const toDateTime = new Date(+filters.transfersCurrentToMs!).toISOString().slice(0, 19).replace("T", " ");
		const selectedAges = (filters.selectedAges! as unknown as string).split(",");

		const placeholders = selectedAges.map(() => "?").join(","); // Create `?, ?, ?` for SQL

		const params = [
			filters.minPrice,
			filters.maxPrice,
			+filters.transfersMinSS!,
			+filters.transfersMaxSS!,
			fromDateTime,
			toDateTime,
			...selectedAges,
			filters.limit,
		];

		this.data = db.prepare(transfersQuery(placeholders)).all(...params);
		this.transfers = this.data;

		console.timeEnd("getTransfers");
		return this;
	}

	get<T>() {
		return this.data as T;
	}
}
