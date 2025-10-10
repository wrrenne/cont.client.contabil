import { InputBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TPeriodoMensal } from "../../enums";

export interface ImpostoMensalInput extends InputBase {
    obrigacaoId?: number;
    competenciaInicial?: string;
    competenciaFinal?: string;
    vencimentoDia: number;
    vencimentoDiaTipo: TDiaTipo;
    prazoDiaAntesVencimento: number;
    periodoMensal: TPeriodoMensal;
    feriadoTipo: TFeriadoTipo;
}
