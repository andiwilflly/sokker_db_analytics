export default function (placeholders: string) {
	return `
        SELECT t.id,
               t.age,
               t.pid,
               t.name,
               t.height,
               t.season,
               t.week,

               t.pace,
               t.technique,
               t.striker,

               t.transfer_date,
               t.transfer_time,
               t.price,
               (t.pace + t.technique + t.passing + t.keeper + t.defender + t.playmaker + t.striker) AS all_skills
        FROM transfers t
        WHERE t.price > ?
          AND t.price < ?
          AND (t.pace + t.technique + t.passing + t.keeper + t.defender + t.playmaker + t.striker) > ?
          AND (t.pace + t.technique + t.passing + t.keeper + t.defender + t.playmaker + t.striker) < ?
          AND DATETIME(t.transfer_date || ' ' || t.transfer_time) BETWEEN ? AND ?
          AND t.age IN (${placeholders})
        ORDER BY DATETIME(t.transfer_date || ' ' || t.transfer_time) DESC
        LIMIT ?`;
}
