import { makeAutoObservable } from "mobx";
import FiltersModel from "@/models/Filters.model";

class RootModel {
	filters = new FiltersModel();

	constructor() {
		makeAutoObservable(this);
	}
}

export default RootModel;
