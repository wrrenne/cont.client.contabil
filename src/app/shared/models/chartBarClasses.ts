import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export interface ChartBar {
    title: string;
    subTitle: string;
    series: BarSerieModel[];
}

export interface BarSerieModel {
    legend: string;
    values: BarValueModel[];
}

export interface BarValueModel {
    title: string;
    value: number;
}

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
    grid: ApexGrid;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
};
