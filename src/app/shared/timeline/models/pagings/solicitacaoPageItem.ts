import { PageItemBase, THorario } from "../../../models";
import { TSolicitacaoTipo, TSolicitacaoStatus } from "../../enums";

export interface SolicitacaoPageItem extends PageItemBase {
    tipo: TSolicitacaoTipo;
    tipoDescricao: string;
    entradaValor?: THorario;
    intervaloValor?: THorario;
    saidaValor?: THorario;
    total?: THorario;
    status: TSolicitacaoStatus;
    statusDescricao: string;
    classificacaoId?: number;
    funcionarioId?: number;
    funcionarioNome: string;
    cargoDescricao: string;
    apontamentoId?: number;
    apontamentoData?: Date;
    dataHora: string;
    dataHoraFormat: string;
    commentId: number;
    comment: string;
}
