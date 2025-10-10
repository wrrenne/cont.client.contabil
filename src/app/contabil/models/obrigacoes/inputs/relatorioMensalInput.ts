import { InputBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TPeriodoMensal } from "../../enums";

export interface RelatorioMensalInput extends InputBase {
    obrigacaoId?: number;
    competenciaInicial?: string;
    competenciaFinal?: string;
    prazoDia: number;
    prazoDiaTipo: TDiaTipo;
    periodoMensal: TPeriodoMensal;
    feriadoTipo: TFeriadoTipo;
}
