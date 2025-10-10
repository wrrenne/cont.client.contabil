import { Component, OnInit } from '@angular/core';
import { toggleAnimation } from '../../../shared/animations';
import { SolicitacaoTipoLabel, TSolicitacaoTipo } from '../../../shared/timeline/enums';
import { SolicitacaoPageItem } from '../../../shared/timeline/models/pagings';
import { TimelinesService } from '../../../shared/timeline/services/timelines.service';

@Component({
    selector: 'solicitacoes-header',
    templateUrl: './solicitacoes-header.html',
    host: { 'class': 'dropdown shrink-0' },
    animations: [toggleAnimation],
    standalone: true
})
export class SolicitacoesHeaderComponent implements OnInit {

    solicitacoes: SolicitacaoPageItem[]

    constructor(
        private timelinesService: TimelinesService
    ) {
    }

    ngOnInit(): void {
        //    this.timelinesService.solicitacoesByCadastroIdListGet().subscribe(x => {
        //        this.solicitacoes = x.obj
        //    })
    }

    getTipoDescricao(tipo: TSolicitacaoTipo): string {
        return SolicitacaoTipoLabel.get(tipo)!
    }
}
