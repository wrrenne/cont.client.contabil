import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexFill,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexPlotOptions,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis,
    ChartComponent,
} from 'ng-apexcharts';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { EncryptionService } from '../../../../shared/services';

@Component({
    selector: 'departamentos-noprazo-widget',
    templateUrl: './departamentos-noprazo-widget.html',
    host: { class: 'h-[430px]' },
    imports: [WidgetComponent, ChartComponent],
})
export class DepartamentoNoPrazoWidgetComponent implements OnInit {
    private isHidden = false;
    @HostBinding('style.display') get display() {
        return this.isHidden ? 'none' : 'block';
    }

    //widget: WidgetFuncionarioBanco

    constructor(
        public storeData: Store<any>,
        private encryptionService: EncryptionService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.initStore();
        //    this.widgetsService.widgetFuncionarioBancoGet(this.funcionarioId).subscribe(x => {
        //        this.widget = x.obj

        //        this.isHidden = !this.widget

        //        if (this.widget) {
        //            this.initStore();
        //        }
        //    })
    }

    store: any;
    isLoading = true;

    public chartOptions: {
        series: ApexAxisChartSeries;
        chart: ApexChart;
        xaxis: ApexXAxis;
        yaxis: ApexYAxis;
        plotOptions: ApexPlotOptions;
        //dataLabels: ApexDataLabels;
        tooltip: ApexTooltip;
        fill: ApexFill;
        grid: ApexGrid;
        legend: ApexLegend;
        colors: string[];
        markers: ApexMarkers;
    };

    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id);
        //    return this.encryptionService.set(<number>id)
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
        const isRtl = this.store.rtlClass === 'rtl' ? true : false;

        //if (!this.widget || this.widget.valores.length <= 1) return

        this.chartOptions = {
            series: [
                {
                    name: 'Fiscal',
                    data: [45, 78, 23, 45, 78],
                },
                {
                    name: 'Contábil',
                    data: [13, 34, 76, 34, 51],
                },
                {
                    name: 'Pessoal',
                    data: [23, 52, 53, 65, 59],
                },
            ],
            chart: {
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                height: 290,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: false,
                },
            } as ApexChart,
            xaxis: {
                categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            } as ApexXAxis,
            yaxis: {
                show: true,
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    formatter: function (val: number) {
                        return `${val}%`;
                    },
                },
            },
            plotOptions: {} as ApexPlotOptions,
            tooltip: {
                enabled: false,
            },
            fill: {} as ApexFill,
            grid: {
                borderColor: isDark ? '#303030' : '#e5e5e5',
                strokeDashArray: 0,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 0,
                    right: 22,
                    bottom: 0,
                    left: 22,
                },
            },
            legend: {} as ApexLegend,
            colors: ['#0000ff', '#00b894', '#fdcb6e'], // Blue, Green, Yellow
            markers: {
                size: 6,
                colors: ['#0000ff', '#00b894', '#fdcb6e'],
                strokeColors: isDark ? '#000' : '#fff',
                strokeWidth: 2,
            } as ApexMarkers,
        };
    }
}
