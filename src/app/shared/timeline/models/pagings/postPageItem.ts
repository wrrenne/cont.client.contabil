import { PostInfo } from "..";
import { PageItemBase } from "../../../models";
import { TPostIcone, TPostTipo } from "../../enums";
import { CommentPageItem } from "./commentPageItem";

export interface PostPageItem extends PageItemBase {
    publicacaoDataHora: string;
    publicacaoDataFormat: string;
    publicacaoHoraFormat: string;
    publicacaoSemanaFormat: string;
    headerDescricao: string;
    headerDescricao2: string;
    //headerIcone: TPostIcone;
    //headerIconeHint: string;
    userId?: number;
    userNome?: string;
    userNomeFormat?: string;
    tipo?: TPostTipo;
    origemId?: number;
    conteudo: string;
    acao?: string;
    acaoTitulo?: string;
    imagemUrl: string;
    conteudoObj: any;
    competencia?: string;
    funcionarioId?: number;
    funcionarioNome?: string;
    funcionarioNomeFormat?: string;
    funcionarioUserId?: number;
    clienteId?: number;
    clienteNome: string;
    postUserId?: number;
    postUserNome: string;
    postUserNomeFormat: string;
    comments: CommentPageItem[];
    postInfo: PostInfo;
}
