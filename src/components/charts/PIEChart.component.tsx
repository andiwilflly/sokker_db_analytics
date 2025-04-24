"use client";
// @ts-ignore
import * as echarts from "echarts";
import React from "react";

interface IProps {
	title: string;
	legendFormatter: string;
	chartData: TPIEChartData;
}

export default class PIEChart extends React.Component<IProps> {
	$chart = React.createRef<HTMLDivElement>();
	chartInstance: echarts.ECharts | null = null;

	componentDidMount() {
		this.chartInstance = echarts.init(this.$chart.current);
		this.update();

		window.addEventListener("resize", this.onResize);
	}

	componentDidUpdate(prevProps: IProps) {
		if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) this.update();
	}

	componentWillUnmount() {
		this.chartInstance?.dispose();
		window.removeEventListener("resize", this.onResize);
	}

	onResize = () => {
		this.chartInstance?.resize();
	};

	update = () => {
		this.chartInstance?.clear();

		this.chartInstance?.setOption({
			animation: false,
			title: {
				text: this.props.title,
				left: "center",
			},
			tooltip: {
				trigger: "item",
				formatter: this.props.legendFormatter,
			},
			legend: {
				orient: "vertical",
				left: "left",
				top: 40,
				// formatter: name => {
				// 	const item = chartData.find(d => d.name === name);
				// 	return `Age ${name}: ${item?.value ?? 0} transfers`;
				// },
			},
			series: [
				{
					name: "Age Group",
					type: "pie",
					radius: "50%",
					data: this.props.chartData,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "rgba(0, 0, 0, 0.5)",
						},
					},
				},
			],
		});
	};

	render() {
		return (
			<>
				<div ref={this.$chart} className="w-full h-full" />
			</>
		);
	}
}
