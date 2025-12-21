import { SistemaTipo } from 'src/app/shared/models';

export interface NovoAcessoInput {
    revendaId: number;
    razaoSocial: string;
    cnpj: string;
    responsavel: string;
    cpf: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    municipioCodigo?: number;
    municipioTexto?: string;
    uf: string;
    cep: string;
    ddd: string;
    telefone: string;
    celular: string;
    email: string;
    password: string;
    sistemaId: SistemaTipo;
    pacoteId: number;
}
