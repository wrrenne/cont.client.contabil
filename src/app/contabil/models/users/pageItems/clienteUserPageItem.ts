import { PageItemBase } from "../../../../shared/models";
import { ObrigacoesStat } from "../../obrigacoes";

export interface ClienteUserPageItem extends PageItemBase {
    userId?: number;
    userNome: string;
    userEmail: string;
    departamentoId: number;
    departamentoNome: string;
    departamentoCor: string;
    mesInicial?: Date;
    mesFinal?: Date;
    obrigacoesStat?: ObrigacoesStat
}
