import { SistemaTipo } from "../../../models";

export interface Invite {
    cadastroId: number;
    revendaId?: number;
    nome: string;
    email: string;
    sistemaId: SistemaTipo;
    conviteEnviadoPorUserId: number;
}
