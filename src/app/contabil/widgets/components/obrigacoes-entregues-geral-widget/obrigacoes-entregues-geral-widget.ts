import { Component, HostBinding, OnInit } from '@angular/core';
import { WidgetObrigacoesEntregues } from 'src/app/contabil/models/widgets';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { RadialProgressComponent } from 'src/app/shared/controls/radial-progress/radial-progress';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { EncryptionService } from '../../../../shared/services';
import { WidgetsService } from '../../services/widgets.service';

@Component({
    selector: 'obrigacoes-entregues-geral-widget',
    templateUrl: './obrigacoes-entregues-geral-widget.html',
    host: { class: 'h-[430px]' },
    standalone: true,
    imports: [WidgetComponent, PercentageBarComponent, RadialProgressComponent],
})
export class ObrigacoesEntreguesGeralWidgetComponent implements OnInit {
    private isHidden = false;
    @HostBinding('style.display') get display() {
        return this.isHidden ? 'none' : 'block';
    }

    widget: WidgetObrigacoesEntregues;

    constructor(
        private encryptionService: EncryptionService,
        private widgetsService: WidgetsService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.widgetsService.widgetObrigacoesEntreguesGet().subscribe((x) => {
            this.widget = x.obj;
            this.isHidden = !this.widget;
        });
    }

    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id);
    }
}
