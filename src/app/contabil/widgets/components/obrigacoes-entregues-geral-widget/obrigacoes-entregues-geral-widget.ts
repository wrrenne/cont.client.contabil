import { Component, HostBinding, OnInit } from '@angular/core';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { RadialProgressComponent } from 'src/app/shared/controls/radial-progress/radial-progress';
import { WidgetComponent } from 'src/app/shared/controls/widget/widget';
import { EncryptionService } from '../../../../shared/services';

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

    //widget: WidgetFuncionarioBanco

    constructor(private encryptionService: EncryptionService) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
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

    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id);
        //    return this.encryptionService.set(<number>id)
    }
}
