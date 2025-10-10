export interface UserPageItem {
    id: number;
    cadastroId?: number;
    cadastroNome: string;
    funcionarioId?: number;
    funcionarioNome: string;
    userNome: string;
    userNomeFormat: string;
    sistemaId: number;
    sistemaNome: string;
    ultimoAcesso?: Date;
    master: boolean;
    email: string;
    cpf: string;
    mesInicial?: string;
    mesFinal?: string;
    supervisor: boolean;
}
