import { PageItemBase } from 'src/app/shared/models';
import { ObrigacoesStat } from '../../obrigacoes';

export interface ObrigacaoUserPageItem extends PageItemBase {
    userId?: number;
    userNome: string;
    userEmail: string;
    departamentoId: number;
    departamentoNome: string;
    departamentoCor: string;
    obrigacaoId: number;
    obrigacaoDescricao: string;
    mesInicial?: Date;
    mesFinal?: Date;
    obrigacoesStat: ObrigacoesStat;
}
