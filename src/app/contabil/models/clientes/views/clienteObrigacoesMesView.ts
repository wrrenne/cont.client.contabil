import { ObrigacoesStat } from "../../obrigacoes";

export interface ClienteObrigacoesMesView {
    clienteId: number;
    mes: Date;
    impostos: ObrigacoesStat;
    acessorias: ObrigacoesStat;
    relatorios: ObrigacoesStat;
}
