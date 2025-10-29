import { TObrigacaoTipo } from '../../enums';

export class ObrigacoesParameter {
    clienteId?: number;
    obrigacaoId?: number;
    obrigacaoDescricao?: string;
    userId?: number;
    perfilItemId?: number;
    searchText?: string;
    mes?: Date;
    departamentoId?: number;
    tipo?: TObrigacaoTipo;
}
