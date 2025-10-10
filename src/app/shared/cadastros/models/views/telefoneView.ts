import { ViewBase } from "../../../models";

export interface TelefoneView extends ViewBase {
    ddd: string;
    numero: string;
}