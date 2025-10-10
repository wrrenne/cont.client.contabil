import { SistemaTipo } from "../../../../shared/models";

export interface ConviteInput {
    cadastroId: number;
    nome: string;
    email: string;
    password: string;
    sistemaId: SistemaTipo;
    conviteAceito: boolean;
}
