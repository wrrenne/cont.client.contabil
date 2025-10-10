import { InputBase, SistemaTipo } from "../../../models";

export interface CadastroInput extends InputBase {
    revendaId?: number;
    cadastroId?: number;
    originalId?: number;
    numero?: number;
    nome: string;
    cnpj?: string;
    inscricaoEstadual?: string;
    cpf?: string;
    dataInicial?: string;
    sistema?: SistemaTipo;
}
