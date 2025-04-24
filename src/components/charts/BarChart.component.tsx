"use client";
// @ts-ignore
import * as echarts from "echarts";
import React from "react";

interface IProps {
	title: string;
	yAxisName: string;
	chartData: IBarChartData;
}

export default class BarChart extends React.Component<IProps> {
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

		// Modify each series to use bar type
		const barSeries = this.props.chartData.series.map(series => ({
			...series,
			type: "bar",
		}));

		this.chartInstance?.setOption({
			animation: false,
			title: {
				text: this.props.title,
				left: "center",
			},
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "shadow", // Use shadow for bar charts instead of line
				},
			},
			grid: {
				left: 40,
				right: "5%",
				bottom: 0,
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
			series: barSeries,
		});
	};

	render() {
		return (
			<>
				<div ref={this.$chart} className="w-full h-full"/>
			</>
		);
	}
}
