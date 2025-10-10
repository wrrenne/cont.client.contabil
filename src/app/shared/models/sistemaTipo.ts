export enum SistemaTipo {
    Nenhum = 0,
    Ponto = 10,
    Financeiro = 11,
    Contabil = 12,
    Holerite = 13,
    Ged = 14,
    Funcionario = 20,
    Cliente = 30,
    RevendaMaster = 40,
    Revenda = 41
}

export const SistemaTipoDescription = new Map<number, string>([
    [SistemaTipo.Ponto, 'Ponto'],
    [SistemaTipo.Financeiro, 'Financeiro'],
    [SistemaTipo.Contabil, 'Contabil'],
    [SistemaTipo.Holerite, 'Holerite'],
    [SistemaTipo.Ged, 'Ged'],
    [SistemaTipo.Funcionario, 'Funcionario'],
    [SistemaTipo.Cliente, 'Cliente'],
    [SistemaTipo.RevendaMaster, 'Revenda Master'],
    [SistemaTipo.Revenda, 'Revenda'],
]);
