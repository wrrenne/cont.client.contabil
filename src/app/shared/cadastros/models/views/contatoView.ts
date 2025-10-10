import { TelefoneView } from ".";
import { ViewBase } from "../../../models";

export interface ContatoView extends ViewBase {
    cadastroId?: number;
    nome: string;
    cargo: string;
    telefones: TelefoneView[];
}