import { SistemaTipo } from "../app/shared/models";
import { EnvironmentModel } from "../app/shared/models/environment-model";

export const environment: EnvironmentModel = {
    production: true,
    debug: false,
    useEncryption: true,
    sistemaPrefix: 'cnt',
    rootFolder: 'contabil',
    sistema: SistemaTipo.Contabil,
    simulateDelay: false,
    delayMs: 0,
    logPaging: false,
};
