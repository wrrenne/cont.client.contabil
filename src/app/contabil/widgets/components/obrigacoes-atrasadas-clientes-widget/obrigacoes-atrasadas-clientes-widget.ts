import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TObrigacaoStatus } from 'src/app/contabil/models/enums';
import { WidgetObrigacoesAtrasadas } from 'src/app/contabil/models/widgets';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { DateUtilsService, EncryptionService, StringsService } from 'src/app/shared/services';
import { PadNumberPipe } from '../../../../shared/pipes/padNumber.pipe';
import { FormatSingularPluralPipe } from '../../../../shared/pipes/singular-plural.pipe';
import { WidgetsService } from '../../services/widgets.service';

@Component({
    selector: 'obrigacoes-atrasadas-clientes-widget',
    templateUrl: './obrigacoes-atrasadas-clientes-widget.html',
    host: { class: 'h-[430px]' },
    imports: [CommonModule, RouterLink, WidgetComponent, PadNumberPipe, FormatSingularPluralPipe],
})
export class ObrigacoesAtrasadasClientesWidgetComponent implements OnInit {
    private isHidden = false;
    @HostBinding('style.display') get display() {
        return this.isHidden ? 'none' : 'block';
    }

    TObrigacaoStatus = TObrigacaoStatus;
    subTitle: string;

    widget: WidgetObrigacoesAtrasadas;

    constructor(
        public encryptionService: EncryptionService,
        private widgetsService: WidgetsService,
        private dateUtilsService: DateUtilsService,
        private stringsService: StringsService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.widgetsService.widgetObrigacoesAtrasadasClientesGet().subscribe((x) => {
            this.widget = x.obj;
            this.isHidden = !this.widget;
        });
    }
}
