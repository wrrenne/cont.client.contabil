import { TObrigacaoTipo } from "../../enums"

export class ObrigacoesParameter {
    clienteId?: number
    obrigacaoId?: number
    userId?: number
    perfilItemId?: number
    searchText?: string
    mes?: Date
    departamentoId?: number
    //tipos?: string
    //departamentoIds?: string
    tipo?: TObrigacaoTipo
}
