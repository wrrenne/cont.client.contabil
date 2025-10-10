export enum TDiaTipo {
    DiasUteis = 1,
    DiasFixos = 2
}

export enum TObrigacaoTipo {
    Imposto = 1,
    Acessoria = 2,
    Relatorio = 3,
    Solicitacoes = 5,
    Users = 6,
}

export const ObrigacaoTipoDescription = new Map<number, string>([
    [TObrigacaoTipo.Imposto, 'Imposto'],
    [TObrigacaoTipo.Acessoria, 'Obrigação Acessória'],
    [TObrigacaoTipo.Relatorio, 'Relatório']
]);

export const ObrigacaoTipoNovoDescription = new Map<number, string>([
    [TObrigacaoTipo.Imposto, 'Novo Imposto'],
    [TObrigacaoTipo.Acessoria, 'Nova Obrigação Acessória'],
    [TObrigacaoTipo.Relatorio, 'Nova Relatório']
]);

export enum TPeriodicidade {
    Mensal = 1,
    Anual = 2,
    Nenhum = 100
}

export enum TFeriadoTipo {
    MesmoDia = 0,
    Antecipar = -1,
    Postergar = 1
}

export enum TEsfera {
    Federal = 1,
    Estadual = 2,
    Municipal = 3
}

export enum TPeriodoAnual {
    MesmoAno = 0,
    AnoSeguinte = 1,
    Nenhum = 100
}

export enum TMes {
    Janeiro = 1,
    Fevereiro = 2,
    Marco = 3,
    Abril = 4,
    Maio = 5,
    Junho = 6,
    Julho = 7,
    Agosto = 8,
    Setembro = 9,
    Outubro = 10,
    Novembro = 11,
    Dezembro = 12,
    Nenhum = 100
}

export enum TPeriodoMensal {
    MesmoMes = 0,
    Mes1 = 1,
    Mes2 = 2,
    Mes3 = 3,
    Mes4 = 4,
    Mes5 = 5,
    Mes6 = 6,
    Mes7 = 7,
    Mes8 = 8,
    Mes9 = 9,
    Mes10 = 10,
    Mes11 = 11,
    Nenhum = 100
}

//export enum TTipoPessoa {
//    PessoaJuridica = 1,
//    PessoaFisica = 2
//}

//export enum TSetor {
//    Fiscal = 1,
//    Contabil = 2,
//    Pessoal = 3,
//    Legalizacoes = 4,
//    Arquivo = 5,
//    Cobranca = 6,
//    Suporte = 7,
//    Gerencia = 30
//}

export enum TObrigacaoStatus {
    EmAberto = 0,
    ConcluidoNoPrazo = 1,
    ConcluidoForadoPrazo = 2,
    SemMovimento = 3
}

export enum TMessageText {
    ProcessamentoSucesso = 50,
    ContabilidadeIdNaoInformado = -100,
    MesInicialNaoInformado = -101,
    RegistroNaoLocalizado = -107,
    ParametroPontoUserNecessario = -108,
    Erro = -999
}

export enum TObrigacaoClientePeriodoPor {
    PorCliente = 0,
    PorObrigacao = 1,
    PorUser = 2
}

export enum TRegime {
    Nenhum = 0,
    LucroPresumido = 1,
    LucroReal = 2,
    Simples = 3,
    MEI = 4,
    Autonomo = 5,
    ProfissionalLiberal = 6
}
