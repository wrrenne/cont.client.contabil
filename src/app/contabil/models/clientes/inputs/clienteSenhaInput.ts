import { InputBase } from "../../../../shared/models";

export interface ClienteSenhaInput extends InputBase {
    clienteId: number;
    senhaTipoId: number;
    usuario?: string;
    senhaAcesso?: string;
    cpf?: string;
    codigoAcesso?: string;
    validade?: string | null;
}