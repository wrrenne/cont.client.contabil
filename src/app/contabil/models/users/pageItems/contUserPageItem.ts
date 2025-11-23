import { PageItemBase } from '../../../../shared/models';
import { UserDepartamentoPageItem } from '../../contabil/pageItems';
import { ObrigacoesStat } from '../../obrigacoes';

export interface ContUserPageItem extends PageItemBase {
    userId?: number;
    userNome: string;
    userNomeFormat: string;
    userEmail: string;
    departamentoId?: number;
    departamentoNome: string;
    departamentoCor: string;
    mesInicial?: Date;
    mesFinal?: Date;
    obrigacoesStat?: ObrigacoesStat;
    departamentos?: UserDepartamentoPageItem[];
    ultimoAcesso?: Date;
}
