import { ClienteView } from "../../../../shared/cadastros/models/views";
import { ObrigacoesStat } from "../../obrigacoes";
import { ObrigacaoClientePeriodoUserPageItem } from "../../obrigacoes/pagings";
import { ClientePerfilView } from "./clientePerfilView";

export interface ContabilClienteView extends ClienteView {
    perfis: ClientePerfilView[];
    users: ObrigacaoClientePeriodoUserPageItem[];
    regime: string;
    obrigacoesStat: ObrigacoesStat
}
