import { ObrigacaoClientePeriodoUserPageItem } from ".";
import { ObrigacoesStat } from "..";
import { PageItemBase } from "../../../../shared/models";
import { TEsfera, TMes, TObrigacaoTipo, TPeriodicidade, TPeriodoAnual, TPeriodoMensal } from "../../enums";
import { TVencimentoPrazo, TVencimentoPrazoDia } from "../../types";

export interface ObrigacaoPageItem extends PageItemBase {
    descricao: string;
    tipo: TObrigacaoTipo;
    tipoDescricao: string;
    periodicidade: TPeriodicidade;
    periodicidadeDescricao: string;
    esfera: TEsfera;
    esferaDescricao: string;
    uf?: string;
    municipioCodigo?: number;
    municipioNome?: string;
    departamentoId: number;
    departamentoNome: string;

    vencimentoPrazo: TVencimentoPrazo;
    vencimentoPrazoDia: TVencimentoPrazoDia;
    anualMes?: TMes;
    anualMesDescricao: string;
    periodoAnual?: TPeriodoAnual;
    periodoAnualDescricao?: string;
    periodoMensal?: TPeriodoMensal;
    periodoMensalDescricao?: string;

    gedPastaCodigo: string;
    gedPastaNome?: string;
    obrigacoesStat: ObrigacoesStat;
    users: ObrigacaoClientePeriodoUserPageItem[];
}
