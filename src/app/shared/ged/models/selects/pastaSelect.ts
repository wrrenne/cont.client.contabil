import { PageItemBase } from "../../../models";

export interface PastaSelect extends PageItemBase {
    key: string;
    title: string;
    level: number;
    children: PastaSelect[];
}