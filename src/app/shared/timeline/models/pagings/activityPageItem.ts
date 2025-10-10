import { PageItemBase } from "../../../models";

export interface ActivityPageItem extends PageItemBase {
    html: string;
    dataHora: string;
    dataHoraFormat: string;
    funcionarioId?: number;
    funcionarioNome: string;
    clienteId?: number;
    clienteNome: string;
    userId?: number;
    userNome: string;
    obrigacaoId?: number;
    obrigacaoNome: string;
    postUserId?: number;
    postUserNome: string;
}
