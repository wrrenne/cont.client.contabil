import { ViewBase } from "../../models";

export interface RelatorioView extends ViewBase {
    nome: string;
    relatorioId: number;
    token: string;
}
