import { ViewBase } from "../../../models";

export interface UserView extends ViewBase {
    revendaId?: number;
    revendaNome: string;
    cadastroId?: number;
    cadastroNome: string;
    funcionarioId?: number;
    funcionarioNome: string;
    userNome: string;
    sistemaId: number;
    sistemaNome: string;
    ultimoAcesso?: string; 
    master: boolean;
    email: string;
    pwd: string;
    cpf: string;
    mesInicial?: string;
    mesFinal?: string;
    supervisor: boolean;
}
