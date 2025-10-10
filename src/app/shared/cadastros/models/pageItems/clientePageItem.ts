import { SistemaTipo } from "../../../models";
import { CadastroPageItem } from "./cadastroPageItem";

export interface ClientePageItem extends CadastroPageItem {
    dataInicial: string;
    dataInicialFormat: string;
    dataFinal?: string;
    dataFinalFormat: string;
    sistemaId: SistemaTipo;
    usersCount: number;
    funcionariosCount: number;
}
