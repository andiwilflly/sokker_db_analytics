export {};

declare global {
	interface ITransfer {
		id: number;
		pid: number;
		name: string;
		country: number;
		age: number;
		height: number;
		weight: number;
		season: number;
		week: number;
		price: number;
		form: number;
		stamina: number;
		pace: number;
		technique: number;
		passing: number;
		keeper: number;
		defender: number;
		playmaker: number;
		striker: number;
		tactical_discipline: number;
		experience: number;
		teamwork: number;
		injury: number;
		value: number;
		wage: number;
		transfer_date: string; // ISO 8601 Date string
		transfer_time: string; // Time string (e.g., "00:00")
		transfer_date_finalised: string; // ISO 8601 Date string
		starting_price: number;
		seller_id: number;
		buyer_id: number;
		is_finished: 1 | 0; // 1 for finished, 0 for not finished
		last_updated: string; // ISO 8601 Date string
		// Join SS
		all_skills: number;
	}
}
