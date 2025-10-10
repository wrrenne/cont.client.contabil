import { ObrigacoesStat } from "../../obrigacoes";

export interface UserDepartamentoPageItem {
    userId?: number;
    userNome: string;
    userNomeFormat: string;
    departamentoId?: number;
    departamentoNome: string;
    obrigacoesStat: ObrigacoesStat;
    cor: string;
    avatarFileName: string;
}
