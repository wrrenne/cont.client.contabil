export interface ArquivoEnviarInput {
    file: File,
    clienteId: number,
    obrigacaoId: number,
    competenciaMes?: string,
    competenciaAno?: number
    obrigacaoClientePeriodoId: number
    sistemaUserId: number
}