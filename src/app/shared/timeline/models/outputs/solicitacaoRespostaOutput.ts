import { TSolicitacaoStatus } from '../../enums';

export interface SolicitacaoRespostaOutput {
    solicitacaoId: number;
    commentId: number;
    status?: TSolicitacaoStatus;
}
