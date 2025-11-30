import { ObrigacoesStat } from '../obrigacoes';

export interface WidgetProximosImpostos {
    periodo: string;
    datas: WidgetProximosImpostosData[];
}

export interface WidgetProximosImpostosData {
    data: Date;
    obrigacoes: WidgetProximosImpostosObrigacao[];
}

export interface WidgetProximosImpostosObrigacao {
    obrigacaoId: number;
    obrigacaoNome: string;
    obrigacoesStat: ObrigacoesStat;
}
