import { InputBase, SistemaTipo } from "../../../../models";
import { TUserPrefTipo } from "../../enums";

export interface UserPrefInput extends InputBase {
    userId: number;
    sistemaId: SistemaTipo;
    cadastroId: number;
    tipo: TUserPrefTipo;
    valor: string;
    valores?: string[];
    add: boolean;
    remove: boolean;
}
