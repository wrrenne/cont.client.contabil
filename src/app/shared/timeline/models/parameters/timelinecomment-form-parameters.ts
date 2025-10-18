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
    ponto_ApontamentoData?: string;
    contabil_ObrigacaoNome?: string;
    contabil_Vencimento?: string;
    contabil_Prazo?: string;
    contabil_CompetenciaMes?: string;
    contabil_CompetenciaAno?: number;
    buttons?: TimelineCommentButton[];
    buttonsAfterCommentButton?: boolean;
    postInfo?: PostInfo;
    userNome?: string;
}
