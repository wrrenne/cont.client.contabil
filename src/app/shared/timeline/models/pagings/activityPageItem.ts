import { PageItemBase } from '../../../models';
import { TPostTipo } from '../../enums';

export interface ActivityPageItem extends PageItemBase {
    html: string;
    dataHora: string;
    dataHoraFormat: string;
    funcionarioId?: number;
    funcionarioNome: string;
    clienteId?: number;
    clienteNome: string;
    userId?: number;
    userNome: string;
    obrigacaoId?: number;
    obrigacaoNome: string;
    postUserId?: number;
    postUserNome: string;
    origemId?: number;
    tipo?: TPostTipo;
}
