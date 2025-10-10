import { SistemaTipo } from "../../../../models";

export interface UserPermissaoInput {
    userId?: number;
    cadastroId: number;
    sistemaId: SistemaTipo;
    permissaoId: number;
    valor: boolean;
}