export interface WidgetObrigacoesDia {
    data: string;
    dataFormat: string;
    items: WidgetObrigacoesDiaItem[];
}

export interface WidgetObrigacoesDiaItem {
    obrigacaoId: number;
    obrigacaoDescricao: string;
    obrigacoesTotalCount: number;
    obrigacoesEmAbertoCount: number;
    obrigacoesConcluidasCount: number;
    porcentagemConcluidas: number;
}