import { ViewBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TMes, TPeriodoAnual } from "../../enums";

export interface RelatorioAnualView extends ViewBase {
    obrigacaoId: number;
    competenciaAnoInicial: number;
    competenciaAnoFinal?: number;
    prazoDia: number;
    prazoMes: TMes;
    prazoDiaTipo: TDiaTipo;
    prazoDiaTipoDescricao: string;
    periodoAnual: TPeriodoAnual;
    periodoAnualDescricao: string;
    feriadoTipo: TFeriadoTipo;
    feriadoTipoDescricao: string;
}