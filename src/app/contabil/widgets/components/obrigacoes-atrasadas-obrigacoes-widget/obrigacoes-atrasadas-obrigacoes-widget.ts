import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WidgetObrigacoesAtrasadas } from 'src/app/contabil/models/widgets';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { DateUtilsService, EncryptionService } from 'src/app/shared/services';
import { PadNumberPipe } from '../../../../shared/pipes/padNumber.pipe';
import { FormatSingularPluralPipe } from '../../../../shared/pipes/singular-plural.pipe';
import { WidgetsService } from '../../services/widgets.service';

@Component({
    selector: 'obrigacoes-atrasadas-obrigacoes-widget',
    templateUrl: './obrigacoes-atrasadas-obrigacoes-widget.html',
    host: { class: 'h-[430px]' },
    imports: [CommonModule, RouterLink, WidgetComponent, FormatSingularPluralPipe, PadNumberPipe],
})
export class ObrigacoesAtrasadasObrigacoesWidgetComponent implements OnInit {
    private isHidden = false;
    @HostBinding('style.display') get display() {
        return this.isHidden ? 'none' : 'block';
    }

    subTitle: string;

    widget: WidgetObrigacoesAtrasadas;

    constructor(
        public encryptionService: EncryptionService,
        private widgetsService: WidgetsService,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.widgetsService.widgetObrigacoesAtrasadasObrigacoesGet().subscribe((x) => {
            this.widget = x.obj;
            this.isHidden = !this.widget;
        });
    }
}
