import { THorario, ViewBase } from "../../../models";
import { TSolicitacaoTipo, TSolicitacaoStatus } from "../../enums";

export interface SolicitacaoView extends ViewBase {
    tipo: TSolicitacaoTipo;
    tipoDescricao: string;
    //entrada?: boolean;
    //intervalo?: boolean;
    //saida?: boolean;
    entradaValor?: THorario;
    intervaloValor?: THorario;
    saidaValor?: THorario;
    status: TSolicitacaoStatus;
    statusDescricao: string;
    //dadosList: string[];
    classificacaoId?: number;
    funcionarioId?: number;
    funcionarioNome: string;
    cargoDescricao: string;
    //clienteId?: number;
    //clienteNome: string;
    apontamentoId?: number;
    apontamentoData?: Date;
    dataHora: Date;
    dataHoraFormat: Date;
}
