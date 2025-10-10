import { PageItemBase } from "../../../models";

export interface MunicipioPageItem extends PageItemBase {
    codigo: number;
    uf: string;
    nome: string;
}
