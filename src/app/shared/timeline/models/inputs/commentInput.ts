import { InputBase, SistemaTipo } from '../../../models';

export interface CommentInput extends InputBase {
    cadastroId: number;
    postId?: number;
    commentId?: number;
    userId: number;
    acao?: string;
    imagemUrl?: string;
    texto: string;
    publicacaoDataHora?: string;
    solicitacaoId?: number;
    origemId?: number;

    funcionarioId?: number;
    isFuncionario?: boolean;

    clienteId?: number;
    isCliente?: boolean;

    obrigacaoId?: number;

    sistemaId: SistemaTipo;

    ponto_ApontamentoData?: string;

    contabil_ObrigacaoNome?: string;
    contabil_Vencimento?: string;
    contabil_Prazo?: string;

    arquivosCount?: number;
}
