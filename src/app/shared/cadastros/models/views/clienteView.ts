import { CadastroView } from ".";
import { SistemaTipo } from "../../../models";

export interface ClienteView extends CadastroView {
    dataInicial: Date;
    dataInicialFormat: string;
    dataFinal?: Date;
    dataFinalFormat: string;
    sistemaId: SistemaTipo;
}
