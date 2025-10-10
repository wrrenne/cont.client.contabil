import { ViewBase } from "../../../../shared/models";
import { ObrigacaoPageItem } from "../pagings";

export interface PerfilItemView extends ViewBase {
    perfilItemId: number;
    perfilItemDescricao: string;
    perfilId: number;
    perfilDescricao: string;
    descricao: string;
    obrigacoesCount?: number;
    clientesCount?: number;
    //obrigacoes: ObrigacaoPageItem[];
}
