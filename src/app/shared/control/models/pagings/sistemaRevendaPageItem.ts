import { PageItemBase, SistemaTipo } from "../../../models";

export interface SistemaRevendaPageItem extends PageItemBase {
    sistema: SistemaTipo;
    sistemaDescricao: string;
}