export enum TSetor {
    Indefinido = 0,
    Fiscal = 1,
    Contabil = 2,
    Pessoal = 3,
    Legalizacoes = 4,
    Arquivo = 5,
    Cobranca = 6,
    Suporte = 7,
    Gerencia = 30,
    Master = 31
}

export const SetorDescription = new Map<number, string>([
    [TSetor.Fiscal, 'Fiscal'],
    [TSetor.Contabil, 'Contábil'],
    [TSetor.Pessoal, 'Pessoal'],
    [TSetor.Legalizacoes, 'Fiscal'],
    [TSetor.Arquivo, 'Contábil'],
    [TSetor.Cobranca, 'Cobrança'],
    [TSetor.Suporte, 'Suporte'],
    [TSetor.Gerencia, 'Gerência']
]);
