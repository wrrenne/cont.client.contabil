import { ViewBase } from "../../../../shared/models";
import { TDiaTipo, TFeriadoTipo, TPeriodoMensal } from "../../enums";

export interface ImpostoMensalView extends ViewBase {
    obrigacaoId: number;
    competenciaInicial: string;
    competenciaFinal?: string;
    competenciaInicialFormat: string;
    competenciaFinalFormat?: string;
    vencimentoDia: number;
    vencimentoDiaTipo: TDiaTipo;
    vencimentoDiaTipoDescricao: string;
    prazoDiaAntesVencimento: number;
    periodoMensal: TPeriodoMensal;
    periodoMensalDescricao: string;
    feriadoTipo: TFeriadoTipo;
    feriadoTipoDescricao: string;
}
