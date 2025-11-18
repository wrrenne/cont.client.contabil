import { ClientePageItem } from '../../../../shared/cadastros/models/pageItems';
import { ObrigacoesStat } from '../../obrigacoes';
import { ClientePerfilPageItem, ObrigacaoClientePeriodoUserPageItem } from '../../obrigacoes/pagings';

export interface ContabilClientePageItem extends ClientePageItem {
    perfis: ClientePerfilPageItem[];
    users: ObrigacaoClientePeriodoUserPageItem[];
    regime?: string;
    perfisCount: number;
    obrigacoesStat?: ObrigacoesStat;
}
