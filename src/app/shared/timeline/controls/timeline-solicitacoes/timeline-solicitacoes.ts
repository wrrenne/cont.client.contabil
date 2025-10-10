import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AvatarTitleComponent } from '../../../controls/avatar-title/avatar-title';
import { CardComponent } from '../../../controls/card/card.component';
import { HyperlinkButtonComponent } from '../../../controls/hyperlink-button/hyperlink-button';
import { PagingBase } from '../../../models';
import { TSolicitacaoStatus, TSolicitacaoTipo } from '../../enums';
import { SolicitacaoPageItem } from '../../models/pagings';
import { SolicitacoesByCadastroIdPagingGetService } from '../../services/pagings/solicitacoesByCadastroIdPagingGetService';
import {
    TimelineSolicitacaoRespostaData,
    TimelineSolicitacaoRespostaModalComponent,
} from '../timeline-solicitacao-resposta-modal/timeline-solicitacao-resposta-modal';

export class SolicitacoesParameter {
    status: TSolicitacaoStatus;
}

export class SolicitacaoDetail {
    tipo: TSolicitacaoTipo;
    origemId: number;
}

@Component({
    selector: 'timeline-solicitacoes',
    templateUrl: './timeline-solicitacoes.html',
    standalone: true,
    providers: [NzModalService],
    imports: [CommonModule, InfiniteScrollDirective, AvatarTitleComponent, CardComponent, HyperlinkButtonComponent],
})
export class TimelineSolicitacoesComponent extends PagingBase<SolicitacaoPageItem> {
    TSolicitacaoStatus = TSolicitacaoStatus;
    TSolicitacaoTipo = TSolicitacaoTipo;

    @Output() onDetailClick = new EventEmitter<SolicitacaoDetail>();

    @Input() set parameter(value: SolicitacoesParameter | undefined) {
        if (!value) return;

        this.param.routeStrings = [];

        this.param.queryStrings.clear();
        this.param.queryStrings.set('status', value.status);

        this.refresh();
    }

    constructor(
        injector: Injector,
        solicitacoesByCadastroIdPagingGetService: SolicitacoesByCadastroIdPagingGetService,
        private modalService: NzModalService,
    ) {
        super(injector, solicitacoesByCadastroIdPagingGetService);
    }

    openCommentsClick(solicitacao: SolicitacaoPageItem, status: TSolicitacaoStatus) {
        const parameter: TimelineSolicitacaoRespostaData = {
            solicitacaoId: solicitacao.id!,
            solicitacaoStatus: status,
            commentId: solicitacao.commentId,
            funcionarioNome: solicitacao.funcionarioNome,
            cargoDescricao: solicitacao.cargoDescricao,
        };

        const modal = this.modalService.create({
            nzContent: TimelineSolicitacaoRespostaModalComponent,
            nzWidth: 570,
            nzClosable: false,
            nzFooter: null,
            nzData: parameter,
            //nzMaskClosable: false
        });

        modal.afterClose.subscribe((r) => {
            if (r ?? false) this.deleteRowById(solicitacao.id!);
        });
    }

    showDetailsClick(tipo: TSolicitacaoTipo, origemId: number) {
        var solicitacaoDetail: SolicitacaoDetail = { tipo: tipo, origemId: origemId };
        this.onDetailClick.emit(solicitacaoDetail);
    }
}
