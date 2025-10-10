import { PageItemBase } from "../../../../shared/models";
import { ObrigacoesStat } from "../../obrigacoes";
import { ObrigacaoClientePeriodoUserPageItem } from "../../obrigacoes/pagings";

export interface DepartamentoPageItem extends PageItemBase {
    cadastroId: number;
    nome: string;
    cor: string;
    avatarFileName: string;
    //users: UserDepartamentoPageItem[]
    users: ObrigacaoClientePeriodoUserPageItem[]
    obrigacoesCount?: number
    obrigacoesStat: ObrigacoesStat
}
