import { ViewBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TPeriodoMensal } from "../../enums";

export interface RelatorioMensalView extends ViewBase {
    obrigacaoId: number;
    competenciaInicial: string;
    competenciaFinal?: string;
    competenciaInicialFormat: string;
    competenciaFinalFormat?: string;
    prazoDia: number;
    prazoDiaTipo: TDiaTipo;
    prazoDiaTipoDescricao: string;
    periodoMensal: TPeriodoMensal;
    periodoMensalDescricao: string;
    feriadoTipo: TFeriadoTipo;
    feriadoTipoDescricao: string;
}
