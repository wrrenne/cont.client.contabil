import { TSetor } from "../../../../shared/enums";

export interface SenhaTipoPageItem {
    id: number;
    descricao: string;
    setor?: TSetor;
    setorDescricao: string;
}