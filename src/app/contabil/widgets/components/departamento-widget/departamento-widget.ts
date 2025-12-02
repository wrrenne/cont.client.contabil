import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions } from 'ng-apexcharts';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { WidgetDepartamento } from 'src/app/contabil/models/widgets';
import { AvatarCountComponent } from 'src/app/shared/controls/avatar-count/avatar-count';
import { AvatarImageComponent } from 'src/app/shared/controls/avatar-image/avatar-image';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { TSetor } from 'src/app/shared/enums';
import { EncryptionService, StringsService } from '../../../../shared/services';
import { WidgetsService } from '../../services/widgets.service';

@Component({
    selector: 'departamento-widget',
    templateUrl: './departamento-widget.html',
    host: { class: 'h-[430px]' },
    imports: [CommonModule, RouterLink, NgxTippyModule, WidgetComponent, AvatarImageComponent, AvatarCountComponent],
})
export class DepartamentoWidgetComponent {
    private isHidden = false;
    @HostBinding('style.display') get display() {
        return this.isHidden ? 'none' : 'block';
    }

    private _setor: TSetor;
    @Input() get setor() {
        return this._setor;
    }
    set setor(value: TSetor) {
        this._setor = value;
        this.getData();
    }

    title: string;
    subTitle: string;

    store: any;
    isLoading = true;

    widget: WidgetDepartamento;

    public chartOptions: {
        series: ApexNonAxisChartSeries;
        chart: ApexChart;
        labels: string[];
        plotOptions: ApexPlotOptions;
        colors: string[];
    };

    constructor(
        public storeData: Store<any>,
        public stringsService: StringsService,
        public encryptionService: EncryptionService,
        private widgetsService: WidgetsService,
    ) {
        //this.initStore();
    }

    getData(): void {
        switch (this.setor) {
            case TSetor.Fiscal:
                this.widgetsService.widgetDepartamentoFiscalGet().subscribe((x) => {
                    this.widget = x.obj;
                    this.title = x.obj.title;
                    this.subTitle = x.obj.subTitle;
                    this.isHidden = !this.widget;
                });
                break;
            case TSetor.Contabil:
                this.widgetsService.widgetDepartamentoContabilGet().subscribe((x) => {
                    this.widget = x.obj;
                    this.title = x.obj.title;
                    this.subTitle = x.obj.subTitle;
                    this.isHidden = !this.widget;
                });
                break;
            case TSetor.Pessoal:
                this.widgetsService.widgetDepartamentoPessoalGet().subscribe((x) => {
                    this.widget = x.obj;
                    this.title = x.obj.title;
                    this.subTitle = x.obj.subTitle;
                    this.isHidden = !this.widget;
                });
                break;
        }
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

        const rawData = [{ category: 'Conclusão', value: 12 }];

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

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }
}
