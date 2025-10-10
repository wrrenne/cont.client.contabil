import { InputBase, SistemaTipo } from "../../../models";

export interface UserInput extends InputBase {
    cadastroId?: number;
    funcionarioId?: number;
    userId?: number;
    sistemaId: SistemaTipo;
    master: boolean;
    email: string;
    cpf?: string;
    nome: string;
    mesInicial?: string;
    mesFinal?: string;
    setorFiscal?: boolean;
    setorContabil?: boolean;
    setorPessoal?: boolean;
    supervisor: boolean;
    password?: string;
    comentario?: string;
    createdByRevendaId?: number;
    sendInvite?: boolean;
}
