import DB from "@/db/DB";
import React from "react";

export default function TransfersInfo({db}: { db: DB }) {
	return (
		<>
			<div className="text-xs text-gray-500">Transfers
				found: {new Intl.NumberFormat("fr-FR").format(db.transfers.length)}</div>
			<div className="text-xs text-gray-500">
				Transfers by
				period: {new Date(db.fromMs).toLocaleDateString()} - {new Date(db.toMs).toLocaleDateString()}
			</div>
		</>
	);
}
