import { PageItemBase } from 'src/app/shared/models';
import { TEsfera, TMes, TObrigacaoTipo, TPeriodicidade, TPeriodoAnual, TPeriodoMensal } from '../../enums';
import { TVencimentoPrazo, TVencimentoPrazoDia } from '../../types';

export interface ClientePerfilObrigacaoPageItem extends PageItemBase {
    descricao: string;
    tipo: TObrigacaoTipo;
    tipoDescricao: string;
    tipoDescricaoFormat: string;
    periodicidade: TPeriodicidade;
    periodicidadeDescricao: string;
    esfera: TEsfera;
    esferaDescricao: string;
    uf: string;
    municipioCodigo?: number;
    municipioNome: string;
    departamentoId: number;
    departamentoNome: string;
    vencimentoPrazo: TVencimentoPrazo;
    vencimentoPrazoDia: TVencimentoPrazoDia;
    anualMes?: TMes;
    anualMesDescricao: string;
    periodoAnual?: TPeriodoAnual;
    periodoAnualDescricao: string;
    periodoMensal?: TPeriodoMensal;
    periodoMensalDescricao: string;
    ativo: boolean;
}
