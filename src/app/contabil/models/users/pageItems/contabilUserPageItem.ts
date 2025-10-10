import { UserPageItem } from "../../../../shared/control/models/pagings";
import { UserDepartamentoPageItem } from "../../contabil/pageItems";
import { ObrigacoesStat } from "../../obrigacoes";

export interface ContabilUserPageItem extends UserPageItem {
    obrigacoesStat?: ObrigacoesStat
    departamentos: UserDepartamentoPageItem[]
}
