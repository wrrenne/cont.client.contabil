import { ContabilClienteView } from "../clientes/views";
import { ObrigacaoClientePeriodoView, ObrigacaoView } from "../obrigacoes/views";

export interface ArquivoInfo {
    arquivoNome: string;
    tamanho?: number;
    obrigacao: ObrigacaoView;
    cliente: ContabilClienteView;
    obrigacaoClientePeriodo?: ObrigacaoClientePeriodoView;
    erros: string[]
    retornoErros: string[]
    retornoSucessos: string[]
    submitting: boolean
}
