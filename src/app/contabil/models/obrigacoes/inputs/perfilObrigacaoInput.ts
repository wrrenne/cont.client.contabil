import { InputBase } from "../../../../shared/models";

export interface PerfilObrigacaoInput extends InputBase {
    perfilItemId: number;
    obrigacaoId: number;
    competenciaInicial?: string;
    competenciaFinal?: string;
    competenciaAnoInicial?: number;
    competenciaAnoFinal?: number;
    userId: number;
    comentario: string;
}