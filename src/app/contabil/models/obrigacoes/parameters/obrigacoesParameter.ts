import { TObrigacaoStatus, TObrigacaoTipo } from '../../enums';

export class ObrigacoesParameter {
    clienteId?: number;
    obrigacaoId?: number;
    obrigacaoDescricao?: string;
    userId?: number;
    perfilItemId?: number;
    searchText?: string;
    mesInicial?: Date;
    mesFinal?: Date;
    departamentoId?: number;
    tipo?: TObrigacaoTipo;
    status?: TObrigacaoStatus;
}
