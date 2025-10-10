import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
import { StringsService } from '../../../../shared/services';
import { ObrigacoesStat } from '../../../models/obrigacoes';

@Component({
    selector: 'cliente-resumo-chart-concluidos',
    templateUrl: './cliente-resumo-chart-concluidos.html',
    styleUrls: ['./cliente-resumo-chart-concluidos.scss'],
    standalone: true
})
export class ClienteResumoChartConcluidosComponent {

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
        series: ApexNonAxisChartSeries;
        chart: ApexChart;
        labels: string[];
        plotOptions: ApexPlotOptions;
        colors: string[];
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
        if (!this.obrigacoesStat || this.obrigacoesStat.total == 0) return

        const isDark = this.store.theme === 'dark' || this.store.isDarkMode ? true : false;

        const rawData = [
            { category: "Conclusão", value: this.obrigacoesStat.concluidoPorcento },
        ];

        const color = this.getColor(rawData[0].value);
        const chartlabel = this.stringsService.getSingularPlural(this.obrigacoesStat.total, 'Nenhuma obrigação', '1 obrigação', '{0} obrigações')

        this.chartOptions = {
            series: [rawData[0].value], // Progress percentage
            chart: {
                type: 'radialBar',
                width: 130
            },
            labels: [chartlabel], // Label displayed in the center
            plotOptions: {
                radialBar: {
                    offsetY: -15,
                    startAngle: -90, // Start at the top of the circle
                    endAngle: 90, // End at the bottom of the circle
                    hollow: {
                        size: '50%' // Adjust hollow size (center circle size)
                    },
                    dataLabels: {
                        name: {
                            fontSize: '12px',
                            color: '#777',
                            fontWeight: 'normal',
                            offsetY: 25 // Adjust position of the label
                        },
                        value: {
                            fontSize: '18px',
                            color: '#333',
                            offsetY: -10, // Adjust position of the value
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    }
                }
            },
            colors: [color]
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
