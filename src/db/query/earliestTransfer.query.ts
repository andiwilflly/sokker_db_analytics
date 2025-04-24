export default function () {
	return `SELECT transfer_date, transfer_time
            FROM transfers
            ORDER BY DATETIME(transfer_date || ' ' || transfer_time)
            LIMIT 1`;
}
