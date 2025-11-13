import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AvatarImageComponent } from 'src/app/shared/controls/avatar-image/avatar-image';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { EncryptionService, StringsService } from '../../../../shared/services';

@Component({
    selector: 'departamento-widget',
    templateUrl: './departamento-widget.html',
    host: { class: 'h-[430px]' },
    imports: [RouterLink, NgxTippyModule, WidgetComponent, NgIconComponent, ChartComponent, AvatarImageComponent],
})
export class DepartamentoWidgetComponent {
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
        private stringsService: StringsService,
        public encryptionService: EncryptionService,
    ) {
        this.initStore();
    }

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

        const rawData = [{ category: 'Conclusão', value: 8 }];

        const color = this.getColor(rawData[0].value);
        const chartlabel = this.stringsService.getSingularPlural(8, 'Nenhuma obrigação', '1 obrigação', '{0} obrigações');

        this.chartOptions = {
            series: [rawData[0].value], // Progress percentage
            chart: {
                type: 'radialBar',
                width: 130,
            },
            labels: [chartlabel], // Label displayed in the center
            plotOptions: {
                radialBar: {
                    offsetY: -15,
                    startAngle: -90, // Start at the top of the circle
                    endAngle: 90, // End at the bottom of the circle
                    hollow: {
                        size: '50%', // Adjust hollow size (center circle size)
                    },
                    dataLabels: {
                        name: {
                            fontSize: '12px',
                            color: '#777',
                            fontWeight: 'normal',
                            offsetY: 25, // Adjust position of the label
                        },
                        value: {
                            fontSize: '18px',
                            color: '#333',
                            offsetY: -10, // Adjust position of the value
                            formatter: function (val) {
                                return val + '%';
                            },
                        },
                    },
                },
            },
            colors: [color],
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
