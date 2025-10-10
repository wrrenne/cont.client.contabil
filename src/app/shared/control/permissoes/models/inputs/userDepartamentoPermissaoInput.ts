import { InputBase, SistemaTipo } from "../../../../models";

export interface UserDepartamentoPermissaoInput extends InputBase {
    userId: number;
    cadastroId: number;
    sistemaId: SistemaTipo;
    departamentoIds: number[];
    comentario: string;
    porUserId: number;
}
