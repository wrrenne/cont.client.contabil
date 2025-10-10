import { CadastroInput } from "../../../../shared/cadastros/models/inputs";
import { TRegime } from "../../enums";

export interface ClienteInput extends CadastroInput {
    regime?: TRegime;
    userId: number;
    comentario?: string;
}
