import { InputBase } from "../../../../shared/models";

export interface UserClienteInput extends InputBase {
    cadastroId: number;
    userId: number;
    clienteId: number;
    mesInicial: string;
    departamentoId?: number;
}
