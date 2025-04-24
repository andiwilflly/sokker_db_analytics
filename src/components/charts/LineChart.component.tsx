"use client";
// @ts-ignore
import * as echarts from "echarts";
import React from "react";

interface IProps {
	title: string;
	yAxisName: string;
	chartData: ILineChartData;
}

export default class LineChart extends React.Component<IProps> {
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
		if (this.chartInstance) {
			this.chartInstance.dispose();
		}
		window.removeEventListener("resize", this.onResize);
	}

	onResize = () => {
		this.chartInstance?.resize();
	};

	update = () => {
		// Before calling setOption, clear the chart or use a merge strategy that replaces everything
		this.chartInstance?.clear();

		this.chartInstance?.setOption({
			animation: false,
			title: {
				text: this.props.title,
				left: "center",
			},
			tooltip: {
				trigger: "axis",
			},
			grid: {
				left: 40,
				right: "5%",
				bottom: 110,
				top: 50,
				containLabel: true,
			},
			xAxis: {
				type: "category",
				data: this.props.chartData.xAxisData,
				name: "Height",
				nameLocation: "middle",
				nameGap: 30,
				axisLabel: {
					show: true,
				},
			},
			yAxis: {
				type: "value",
				name: this.props.yAxisName,
				nameLocation: "middle",
				nameGap: 40,
				min: this.props.chartData.minY,
				max: this.props.chartData.maxY,
			},
			series: this.props.chartData.series,
			dataZoom: [
				{
					type: "slider",
					show: true,
					xAxisIndex: 0,
					height: 50,
					bottom: 20,
					labelFormatter: (index: number) => this.props.chartData.xAxisData[index],
				},
				{
					type: "inside", // Allows zooming with scrolling
					xAxisIndex: 0,
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
