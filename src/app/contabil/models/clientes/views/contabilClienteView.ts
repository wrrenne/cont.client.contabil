import { ClienteView } from '../../../../shared/cadastros/models/views';
import { ObrigacoesStat } from '../../obrigacoes';
import { ContUserPageItem } from '../../users/pageItems';
import { ClientePerfilView } from './clientePerfilView';

export interface ContabilClienteView extends ClienteView {
    perfis: ClientePerfilView[];
    users: ContUserPageItem[];
    regime: string;
    obrigacoesStat: ObrigacoesStat;
}
