import { ViewBase } from "../../../../models";

export interface PacoteView extends ViewBase  {
    descricao: string;
    descritivo: string;
    valor: number;
    quantidadeDe: number;
    quantidadeAte?: number;
    recursos: string[];
}
