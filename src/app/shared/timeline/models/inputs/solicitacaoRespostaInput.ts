import { TSolicitacaoStatus } from "../../enums";

export interface SolicitacaoRespostaInput {
    solicitacaoId: number;
    commentId: number;
    userId: number;
    status?: TSolicitacaoStatus;
    texto: string;
}