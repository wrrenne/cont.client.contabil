import { UserView } from "../../../../shared/control/models/views";
import { UserDepartamentoPageItem } from "../../contabil/pageItems";
import { ObrigacoesStat } from "../../obrigacoes";

export interface ContabilUserView extends UserView {
    obrigacoesStat: ObrigacoesStat;
    departamentos: UserDepartamentoPageItem[]
}
