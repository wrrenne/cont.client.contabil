import { PageItemBase } from "../../../models";

export interface UfPageItem extends PageItemBase {
    codigo: number;
    sigla: string;
    nome: string;
}
