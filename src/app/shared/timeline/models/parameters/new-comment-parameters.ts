import { TSolicitacaoStatus } from "../../enums"

export interface NewCommentParameter {
    commentId?: number
    solicitacaoId?: number
    solicitacaoStatus?: TSolicitacaoStatus
    commentUserNome: string
    funcionarioNome?: string
}
