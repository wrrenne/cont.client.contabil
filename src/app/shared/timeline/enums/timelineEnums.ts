export enum TSolicitacaoStatus {
    EmAberto = 0,
    Aceito = 1,
    Rejeitado = 2,
    Tudo = 10,
}

export enum TSolicitacaoTipo {
    Nenhum = 0,
    SolicitacaoInclusaoMarcacoes = 1,
    SolicitacaoAtrasoAbono = 2,
    SolicitacaoAtrasoBanco = 3,
    SolicitacaoFaltaAbono = 4,
    SolicitacaoFaltaBanco = 5,
    SolicitacaoExtraBanco = 6,
    SolicitacaoExtra = 7,
    SolicitacaoFerias = 10,
}

export const SolicitacaoTipoLabel = new Map<TSolicitacaoTipo, string>([
    [TSolicitacaoTipo.SolicitacaoInclusaoMarcacoes, 'Inclusão de Marcação'],
    [TSolicitacaoTipo.SolicitacaoAtrasoAbono, 'Abono de Atraso'],
    [TSolicitacaoTipo.SolicitacaoAtrasoBanco, 'Lançamento de Atraso no Banco de Horas'],
    [TSolicitacaoTipo.SolicitacaoFaltaAbono, 'Abono de falta'],
    [TSolicitacaoTipo.SolicitacaoFaltaBanco, 'Lançamento de Falta no Banco de Horas'],
    [TSolicitacaoTipo.SolicitacaoExtraBanco, 'Lançamento de Extra no Banco de Horas'],
    [TSolicitacaoTipo.SolicitacaoExtra, 'Horas Extras'],
    [TSolicitacaoTipo.SolicitacaoFerias, 'Férias'],
]);

export enum TSolicitacaoGrupoTipo {
    FaltaDeMarcacoes = 1,
    Atrasos = 2,
    Faltas = 3,
    Extras = 4,
    EntradaAtraso = 10,
    IntervaloAtraso = 11,
    SaidaAtraso = 12,
    EntradaExtra = 20,
    IntervaloExtra = 21,
    SaidaExtra = 22,
}

export const TSolicitacaoGrupoTipoLabel = new Map<number, string>([
    [TSolicitacaoGrupoTipo.FaltaDeMarcacoes, 'Falta de Marcações'],
    [TSolicitacaoGrupoTipo.Atrasos, 'Atrasos'],
    [TSolicitacaoGrupoTipo.Faltas, 'Falta'],
    [TSolicitacaoGrupoTipo.Extras, 'Extras'],

    [TSolicitacaoGrupoTipo.EntradaAtraso, 'Atraso na Entrada'],
    [TSolicitacaoGrupoTipo.IntervaloAtraso, 'Atraso no Intervalo'],
    [TSolicitacaoGrupoTipo.SaidaAtraso, 'Saída Antecipada'],
    [TSolicitacaoGrupoTipo.EntradaExtra, 'Extra na Entrada'],
    [TSolicitacaoGrupoTipo.IntervaloExtra, 'Extra no Intervalo'],
    [TSolicitacaoGrupoTipo.SaidaExtra, 'Extra na Saída'],
]);

//export enum TSolicitacaoSubTipo {
//    Entrada = 1,
//    Intervalo = 2,
//    Saida = 3
//}

//export const SolicitacaoSubTipoLabel = new Map<TSolicitacaoSubTipo, string>([
//    [TSolicitacaoSubTipo.Entrada, 'Entrada'],
//    [TSolicitacaoSubTipo.Intervalo, 'Intervalo'],
//    [TSolicitacaoSubTipo.Saida, 'Saída']
//]);

//export enum TSolicitacaoTipo {
//    Nenhum = 0,
//    SolicitacaoInclusaoMarcacoes = 1,
//    SolicitacaoTratamentoFalta = 2,
//    SolicitacaoTratamentoAtraso = 3,
//    SolicitacaoTratamentoExtra = 4
//}

export enum TPostTipo {
    Funcionario = 1,
    Ponto = 2,
    Expediente = 3,
    Cargo = 4,
    Departamento = 5,
    Ferias = 6,
    Afastamento = 7,
    ImportacaoArquivoMarcacaoes = 8,
    ApontamentoEncerramento = 9,
    Horario = 10,
    EscalaFuncionario = 11,
    Escala = 12,
    Permissao = 13,
    ContabilCliente = 100,
    ContabilConfiguracaoObrigacao = 101,
    ContabilPerfil = 102,
    ContabilObrigacao = 103,
    ContabilObrigacaoClientePeriodo = 104,
}
export enum TPostIcone {
    Editar = 1,
}
