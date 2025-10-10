import { PageItemBase } from "../../../../models";

export interface PacotePageItem extends PageItemBase {
    descricao: string;
    valor: number;
    quantidadeDe: number;
    quantidadeAte?: number;
}
