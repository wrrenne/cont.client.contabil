import { InputBase, SistemaTipo } from "../../../models";

export interface SistemaCadastroInput extends InputBase {
    revendaId: number;
    cadastroId: number;
    sistemaId: SistemaTipo;
    dataInicial: string;
    dataFinal?: string;
    revendaUserId: number;
    pacoteId?: number;
}
