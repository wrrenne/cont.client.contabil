import { PageItemBase } from "../../../models";
import { ArquivoPageItem } from "./arquivoPageItem";
import { PastaPageItem } from "./pastaPageItem";

export interface PastaOuArquivoPageItem extends PageItemBase {
    arquivo: ArquivoPageItem
    pasta: PastaPageItem
}
