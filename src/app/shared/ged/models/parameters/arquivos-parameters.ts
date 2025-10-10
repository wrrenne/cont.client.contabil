import { TGedRefType } from "../../enums/ged-enums"

export class ArquivosParameter {
    pastaId?: number
    funcionarioId?: number
    cadastroId?: number
    tipo?: TGedRefType
    searchText?: string
    showChildren?: boolean
}
