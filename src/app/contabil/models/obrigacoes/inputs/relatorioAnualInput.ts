import { InputBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TMes, TPeriodoAnual } from "../../enums";

export interface RelatorioAnualInput extends InputBase {
    obrigacaoId?: number;
    competenciaAnoInicial?: number;
    competenciaAnoFinal?: number;
    prazoDia: number;
    prazoMes: TMes;
    prazoDiaTipo: TDiaTipo;
    periodoAnual: TPeriodoAnual;
    feriadoTipo: TFeriadoTipo;
}
