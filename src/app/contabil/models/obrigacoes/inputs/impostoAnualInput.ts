import { InputBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TMes, TPeriodoAnual } from "../../enums";

export interface ImpostoAnualInput extends InputBase {
    obrigacaoId?: number;
    competenciaAnoInicial?: number;
    competenciaAnoFinal?: number;
    vencimentoDia: number;
    vencimentoMes: TMes;
    vencimentoDiaTipo: TDiaTipo;
    prazoDiaAntesVencimento: number;
    periodoAnual: TPeriodoAnual;
    feriadoTipo: TFeriadoTipo;
}
