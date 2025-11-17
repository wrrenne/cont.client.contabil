import { PostInfo } from '..';
import { TimelineCommentButton } from '../../controls/timeline-comment-form/timeline-comment-form';
import { TPostTipo } from '../../enums';
import { SolicitacaoPageItem } from '../pagings';
import { SolicitacaoGrupo } from '../solicitacaoGrupo';

export class TimelineCommentFormParameter {
    title?: string;
    subTitle?: string;
    postId?: number;
    commentId?: number;
    solicitacaoGrupos?: SolicitacaoGrupo[];
    origemId?: number;
    clienteId?: number;
    clienteNome?: string;
    funcionarioId?: number;
    funcionarioNome?: string;
    obrigacaoId?: number;
    tipo?: TPostTipo;
    solicitacao?: SolicitacaoPageItem;
    ponto_ApontamentoData?: Date;
    contabil_ObrigacaoNome?: string;
    contabil_Vencimento?: Date;
    contabil_Prazo?: Date;
    contabil_CompetenciaMes?: Date;
    contabil_CompetenciaAno?: number;
    buttons?: TimelineCommentButton[];
    buttonsAfterCommentButton?: boolean;
    postInfo?: PostInfo;
    userNome?: string;
    hideCommentLinksVisible? = false;
}
