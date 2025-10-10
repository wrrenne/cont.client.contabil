import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexPlotOptions,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
} from 'ng-apexcharts';
import { ObrigacaoView } from '../../../models/obrigacoes/views';
import { ObrigacaoResumoChartComponent } from '../obrigacao-resumo-chart/obrigacao-resumo-chart';
import { ObrigacaoResumoDatasComponent } from '../obrigacao-resumo-datas/obrigacao-resumo-datas';
import { ObrigacoesResumoUsersComponent } from '../obrigacao-resumo-users/obrigacao-resumo-users';

@Component({
    selector: 'obrigacao-resumo',
    templateUrl: './obrigacao-resumo.html',
    imports: [ObrigacaoResumoDatasComponent, ObrigacoesResumoUsersComponent, ObrigacaoResumoChartComponent],
})
export class ObrigacaoResumoComponent {
    private _obrigacao: ObrigacaoView;
    @Input() get obrigacao() {
        return this._obrigacao;
    }
    set obrigacao(value: ObrigacaoView) {
        this._obrigacao = value;
        this.initStore();
    }

    store: any;
    isLoading = true;

    public chartOptions: {
        series: ApexAxisChartSeries;
        chart: ApexChart;
        xaxis: ApexXAxis;
        yaxis: ApexYAxis;
        plotOptions: ApexPlotOptions;
        dataLabels: ApexDataLabels;
        tooltip: ApexTooltip;
        fill: ApexFill;
        grid: ApexGrid;
        legend: ApexLegend;
    };

    constructor(public storeData: Store<any>) {}

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                const hasChangeTheme = this.store?.theme !== d?.theme;
                const hasChangeLayout = this.store?.layout !== d?.layout;
                const hasChangeMenu = this.store?.menu !== d?.menu;
                const hasChangeSidebar = this.store?.sidebar !== d?.sidebar;

                this.store = d;

                if (hasChangeTheme || hasChangeLayout || hasChangeMenu || hasChangeSidebar) {
                    if (this.isLoading || hasChangeTheme) {
                        this.initCharts(); //init charts
                    } else {
                        setTimeout(() => {
                            this.initCharts(); // refresh charts
                        }, 300);
                    }
                }
            });
    }

    initCharts() {
        const isDark = this.store.theme === 'dark' || this.store.isDarkMode ? true : false;

        const rawData = [
            { category: 'Conclusão', value: this.obrigacao.obrigacoesStat.concluidasNoPrazo },
            { category: 'Atraso', value: this.obrigacao.obrigacoesStat.concluidasForaDoPrazo },
            { category: 'Atrasado', value: this.obrigacao.obrigacoesStat.emAtraso },
            { category: 'Aberto', value: this.obrigacao.obrigacoesStat.emAberto },
        ];

        this.chartOptions = {
            series: [
                {
                    name: 'Clientes',
                    data: rawData.map((item) => item.value),
                },
            ],
            chart: {
                type: 'bar',
                height: 170,
                offsetY: -15,
                width: '100%',
                zoom: {
                    enabled: false,
                },
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '32',
                    borderRadius: 25,
                    barHeight: 300,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        position: 'bottom', // top, center, bottom
                    },
                    distributed: true,
                },
            },
            dataLabels: {
                enabled: true,
                //offsetX: 15,
                textAnchor: 'middle',
                style: {
                    colors: [isDark ? '#FFFFFF' : '#202020'], // Font color based on theme
                },
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                categories: rawData.map((item) => item.category),

                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                position: 'bottom', // Move labels to the top of the bars
                labels: {
                    rotate: 0,
                    show: true,
                    trim: true,
                },
            },
            yaxis: {
                show: false,
                //    labels: {
                //        offsetY: -18,  // Position above the bars
                //        offsetX: 75,
                //        align: 'left',
                //        style: {
                //            colors: "#333",
                //            fontSize: "12px",
                //        }
                //    }
            },
            fill: {
                type: 'gradient',
                colors: isDark ? ['#1d4ed8', '#a16207', '#b91c1c', '#374151'] : ['#93c5fd', '#fde047', '#fca5a5', '#d1d5db'],
            },
            grid: {
                show: false,
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
            },
            legend: {
                show: false,
                position: 'bottom',
            },
        };
    }

    getColor(percentage: number): string {
        if (percentage <= 25) {
            return '#EF4444'; // Red (from-red-500)
        } else if (percentage > 25 && percentage <= 50) {
            return '#F59E0B'; // Yellow (from-yellow-500)
        } else if (percentage > 50 && percentage <= 75) {
            return '#10B981'; // Green (from-green-500)
        } else {
            return '#3B82F6'; // Blue (from-blue-500)
        }
    }

    getPercentagemColor(percentage: number): string {
        if (percentage <= 25) {
            return 'text-red-500'; // Red (from-red-500)
        } else if (percentage > 25 && percentage <= 50) {
            return 'text-yellow-500'; // Yellow (from-yellow-500)
        } else if (percentage > 50 && percentage <= 75) {
            return 'text-green-500'; // Green (from-green-500)
        } else {
            return 'text-blue-500'; // Blue (from-blue-500)
        }
    }
}
