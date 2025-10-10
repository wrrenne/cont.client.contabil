import { ViewBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TMes, TPeriodoAnual } from "../../enums";

export interface ImpostoAnualView extends ViewBase {
    obrigacaoId: number;
    competenciaAnoInicial: number;
    competenciaAnoFinal?: number;
    vencimentoDia: number;
    vencimentoMes: TMes;
    vencimentoDiaTipo: TDiaTipo;
    vencimentoDiaTipoDescricao: string;
    prazoDiaAntesVencimento: number;
    periodoAnual: TPeriodoAnual;
    periodoAnualDescricao: string;
    feriadoTipo: TFeriadoTipo;
    feriadoTipoDescricao: string;
}