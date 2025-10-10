import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexPlotOptions, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { StringsService } from '../../../../shared/services';
import { ObrigacoesStat } from '../../../models/obrigacoes';

@Component({
    selector: 'cliente-resumo-chart',
    templateUrl: './cliente-resumo-chart.html',
    styleUrls: ['./cliente-resumo-chart.scss'],
    host: { 'class': 'h-[320px]' },
    standalone: true
})
export class ClienteResumoChartComponent {

    private _obrigacoesStat: ObrigacoesStat
    @Input() get obrigacoesStat() {
        return this._obrigacoesStat
    }
    set obrigacoesStat(value: ObrigacoesStat) {
        this._obrigacoesStat = value
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

    constructor(
        public storeData: Store<any>,
        private stringsService: StringsService) { }

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
            { category: "No Prazo", value: this.obrigacoesStat.concluidasNoPrazo },
            { category: "Fora do Prazo", value: this.obrigacoesStat.concluidasForaDoPrazo },
            { category: "Atrasado", value: this.obrigacoesStat.emAtraso },
            { category: "Aberto", value: this.obrigacoesStat.emAberto },
        ];

        this.chartOptions = {
            series: [
                {
                    name: "Clientes",
                    data: rawData.map(item => item.value)
                }
            ],
            chart: {
                type: "bar",
                height: 220,
                offsetY: -15,
                width: 410,
                zoom: {
                    enabled: false
                },
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "32",
                    barHeight: 300,
                    dataLabels: {
                        position: "bottom", // top, center, bottom
                    },
                    distributed: true
                }
            },
            dataLabels: {
                enabled: true,
                //offsetX: 15,
                textAnchor: 'middle',
                style: {
                    colors: [isDark ? '#FFFFFF' : '#202020']  // Font color based on theme
                },
            },
            tooltip: {
                enabled: false,
            },
            xaxis: {
                categories: rawData.map(item => item.category),

                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                position: "bottom",  // Move labels to the top of the bars
                labels: {
                    show: false,
                }
            },
            yaxis: {
                show: false,
            },
            fill: {
                type: 'gradient',
                colors: isDark ? ["#1d4ed8", "#a16207", "#b91c1c", "#374151"] : ["#93c5fd", "#fde047", "#fca5a5", "#d1d5db"]
            },
            grid: {
                show: false,
                padding: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }
            },
            legend: {
                show: true,
                position: 'bottom',
            }
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

    getPlural(n: number): string {
        return this.stringsService.getSingularPlural(n, "Nenhuma obrigação concluída", "1 obrigação concluída", "{0} obrigações concluídas")
    }
}
