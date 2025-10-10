import { PageItemBase } from "../../../../shared/models";
import { ObrigacoesStat, PerfilChartItem } from "../../obrigacoes";

export interface PerfilPageItem extends PageItemBase {
    perfilItemId?: number;
    perfilItemDescricao: string;
    perfilDescricao: string;
    descricao: string;
    perfilId?: number;
    cor: string;
    avatarFileName: string;
    //obrigacoesCount?: number;
    obrigacoesStat?: ObrigacoesStat
    //chartItems: PerfilChartItem[]
}
