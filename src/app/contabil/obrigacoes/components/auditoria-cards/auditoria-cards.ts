import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuditoriaModel } from 'src/app/contabil/models/obrigacoes';
import { PanelTableComponent } from 'src/app/shared/controls/table-header/panel-table';
import { DateUtilsService } from 'src/app/shared/services';
import { ObrigacoesService } from '../../services/obrigacoes.service';
import { ObrUsersAuditoriaTableComponent } from '../obr-users-auditoria-table/obr-users-auditoria-table';

@Component({
    selector: 'auditoria-cards',
    templateUrl: './auditoria-cards.html',
    imports: [CommonModule, ObrUsersAuditoriaTableComponent, PanelTableComponent],
})
export class AuditoriaCardsComponent implements OnInit {
    auditoria: AuditoriaModel;

    constructor(
        private obrigacoesService: ObrigacoesService,
        private dateUtilsService: DateUtilsService,
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        const mes = this.dateUtilsService.getToday();

        this.obrigacoesService.auditoriaGet(mes).subscribe((x) => {
            this.auditoria = x.obj;
        });
    }
}
