import { InputBase, SistemaTipo } from "../../../models";

export interface CadastroClienteInput extends InputBase {
    cadastroId?: number;
    clienteId: number;
    dataInicial: string;
    dataFinal?: string;
    sistema: SistemaTipo;
}