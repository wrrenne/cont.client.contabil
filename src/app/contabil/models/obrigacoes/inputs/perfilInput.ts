import { InputBase } from "../../../../shared/models";

export interface PerfilInput extends InputBase {
    cadastroId: number;
    descricao: string;
    ordem?: number;
    userId: number;
    comentario: string;
}
