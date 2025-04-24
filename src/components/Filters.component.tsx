"use client";
import "@ant-design/v5-patch-for-react-19";
import {StoreContext} from "@/app/provider";
import {withPathname} from "@/decorators/withPathName.decorator";
import {formatPriceUAH} from "@/utils/formatPrice.utils";
import {Button, Form, Slider} from "antd";
import {observer} from "mobx-react";
import Link from "next/link";
import {NextRouter} from "next/router";
import React from "react";

class FiltersComponent extends React.Component<{
	router?: NextRouter;
	pathname: string,
	fromMs: number,
	toMs: number
}> {
	static contextType = StoreContext;

	declare context: React.ContextType<typeof StoreContext>;

	componentDidMount() {
		const params = new URLSearchParams(window.location.search);

		// Apply from an url query
		this.context.store.filters.update({
			transfersFromMs: this.props.fromMs,
			transfersToMs: this.props.toMs,
			transfersCurrentFromMs: params.get("transfersCurrentFromMs") ? Number(params.get("transfersCurrentFromMs")!) : this.props.fromMs,
			transfersCurrentToMs: params.get("transfersCurrentToMs") ? Number(params.get("transfersCurrentToMs")!) : this.props.toMs,
			...(params.get("transfersMinSS") && {
				transfersMinSS: Number(params.get("transfersMinSS")!),
			}),
			...(params.get("transfersMaxSS") && {
				transfersMaxSS: Number(params.get("transfersMaxSS")!),
			}),
			...(params.get("minPrice") && {minPrice: Number(params.get("minPrice")!)}),
			...(params.get("maxPrice") && {maxPrice: Number(params.get("maxPrice")!)}),
			...(params.get("selectedAges") && {
				selectedAges: params.get("selectedAges")!.split(",").map(Number),
			}),
		});
	}

	render() {
		return (
			<Form layout="vertical">
				<Form.Item label={`Select transfer period`}>
					<div style={{fontSize: "11px"}}>
						({new Date(this.context.store.filters.transfersCurrentFromMs).toLocaleString()} -{" "}
						{new Date(this.context.store.filters.transfersCurrentToMs).toLocaleString()})
					</div>
					<Slider
						range
						min={this.context.store.filters.transfersFromMs}
						max={this.context.store.filters.transfersToMs}
						step={1000}
						value={[this.context.store.filters.transfersCurrentFromMs, this.context.store.filters.transfersCurrentToMs]}
						onChange={([transfersCurrentFromMs, transfersCurrentToMs]) => {
							this.context.store.filters.update({
								transfersCurrentFromMs,
								transfersCurrentToMs,
							});
						}}
						tooltip={{
							placement: "bottom",
							formatter: time => new Date(time!).toLocaleString(),
						}}
					/>
				</Form.Item>

				<Form.Item label={`Max transfer price`}>
					<div style={{fontSize: "11px"}}>
						{/*({formatPriceUAH(this.context.store.filters.minPrice)} - {formatPriceUAH(this.context.store.filters.maxPrice)})*/}
					</div>
					<Slider
						range
						min={0}
						max={300000000 / 6.4}
						step={100}
						value={[this.context.store.filters.minPrice, this.context.store.filters.maxPrice]}
						onChange={([minPrice, maxPrice]) => {
							this.context.store.filters.update({minPrice, maxPrice});
						}}
						tooltip={{
							placement: "top",
							formatter: price => formatPriceUAH(price!),
						}}
					/>
				</Form.Item>

				<Form.Item label="Summ skill">
					<div style={{fontSize: "11px"}}>
						({this.context.store.filters.transfersMinSS} - {this.context.store.filters.transfersMaxSS})
					</div>
					<Slider
						range
						min={0}
						max={100}
						step={1}
						value={[this.context.store.filters.transfersMinSS, this.context.store.filters.transfersMaxSS]}
						onChange={([transfersMinSS, transfersMaxSS]) => {
							this.context.store.filters.update({
								transfersMinSS,
								transfersMaxSS,
							});
						}}
						tooltip={{
							placement: "top",
							formatter: ss => ss,
						}}
					/>
				</Form.Item>

				<div style={{display: "flex", flexWrap: "wrap", gap: "3px"}}>
					{[999, ...this.context.store.filters.ages].map(age => (
						<Button
							key={age}
							onClick={() => {
								const {selectedAges} = this.context.store.filters;
								let newAges: number[] = [];

								if (age === 999) {
									newAges =
										selectedAges.length === this.context.store.filters.ages.length
											? []
											: this.context.store.filters.ages;
								} else {
									newAges = selectedAges.includes(age) ? selectedAges.filter(a => a !== age) : [...selectedAges, age];
								}

								this.context.store.filters.update({
									selectedAges: newAges,
								});
							}}
							type={this.context.store.filters.selectedAges.includes(age) ? "primary" : "dashed"}
							size="small"
							style={{
								width: 30,
								height: 30,
								padding: 0,
								minWidth: 0,
								lineHeight: 1,
							}}>
							{age === 999 ? "All" : age}
						</Button>
					))}
				</div>

				<div className="mt-5">
					<Button type="primary">
						<Link href={`${this.props.pathname}${this.context.store.filters.query}`}>Apply changes</Link>
					</Button>
				</div>
			</Form>
		);
	}
}

export default withPathname(observer(FiltersComponent));
