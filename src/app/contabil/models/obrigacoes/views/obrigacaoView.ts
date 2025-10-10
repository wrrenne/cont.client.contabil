import { AcessoriaAnualView, AcessoriaMensalView, ImpostoAnualView, ImpostoMensalView, RelatorioAnualView, RelatorioMensalView } from ".";
import { ObrigacoesStat } from "..";
import { ViewBase } from "../../../../shared/models";
import { PostInfo } from "../../../../shared/timeline/models";
import { CommentPageItem } from "../../../../shared/timeline/models/pagings";
import { TEsfera, TMes, TObrigacaoTipo, TPeriodicidade, TPeriodoAnual, TPeriodoMensal } from "../../enums";
import { TVencimentoPrazo, TVencimentoPrazoDia } from "../../types";
import { ObrigacaoClientePeriodoUserPageItem } from "../pagings";

export interface ObrigacaoView extends ViewBase {
    cadastroId?: number;
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

    impostoMensal: ImpostoMensalView;
    impostoAnual: ImpostoAnualView;
    relatorioMensal: RelatorioMensalView;
    relatorioAnual: RelatorioAnualView;
    acessoriaMensal: AcessoriaMensalView;
    acessoriaAnual: AcessoriaAnualView;

    temRecibo: boolean;
    temProtocolo: boolean;
    baixaAnexarDocumento: boolean;
    baixaAnexarRecibo: boolean;
    baixaAnexarProtocolo: boolean;
    estatistica: boolean;
    uploadAvulso: boolean;
    originalId?: number;
    gedPastaCodigo: string;
    gedPastaNome: string;
    identificadorArquivo: string;
    comments: CommentPageItem[];
    postInfo: PostInfo
    users: ObrigacaoClientePeriodoUserPageItem[]
    obrigacoesStat: ObrigacoesStat

    vencimentoPrazo: TVencimentoPrazo;
    vencimentoPrazoDia: TVencimentoPrazoDia;
    anualMes?: TMes;
    anualMesDescricao: string;
    periodoAnual?: TPeriodoAnual;
    periodoAnualDescricao?: string;
    periodoMensal?: TPeriodoMensal;
    periodoMensalDescricao?: string;
}
