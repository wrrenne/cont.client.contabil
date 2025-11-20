import { ObrigacoesStat } from './obrigacoesStat';

export interface AuditoriaModel {
    departamentos: AuditoriaDepartamento[];
    obrigacoesStat: ObrigacoesStat;
}

export interface AuditoriaDepartamento {
    departamentoId: number;
    departamentoNome: string;
    users: AuditoriaUser[];
    obrigacoesStat: ObrigacoesStat;
}

export interface AuditoriaUser {
    userId: number;
    userNome: string;
    obrigacoesStat: ObrigacoesStat;
}
