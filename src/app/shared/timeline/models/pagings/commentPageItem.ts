import { ArquivoPageItem } from "../../../ged/models/pagings";
import { PageItemBase } from "../../../models";
import { SolicitacaoPageItem } from "./solicitacaoPageItem";

export interface CommentPageItem extends PageItemBase {
    userId: number;
    userNome: string;
    userNomeFormat: string;
    userNomeFirstName: string;
    postId?: number;
    acao: string;
    imagemUrl: string;
    texto: string;
    publicacaoDataHora: string;
    publicacaoDataHoraFormat: string;
    solicitacao?: SolicitacaoPageItem;
    comments: CommentPageItem[];
    arquivos: ArquivoPageItem[];
    origemId?: number;
    commentId?: number;
    temArquivo: boolean;
}
