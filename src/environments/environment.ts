// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { SistemaTipo } from '../app/shared/models';
import { EnvironmentModel } from '../app/shared/models/environment-model';

export const environment: EnvironmentModel = {
    production: false,
    debug: true,
    useEncryption: false,
    sistemaPrefix: 'cnt',
    rootFolder: 'contabil',
    sistema: SistemaTipo.Contabil,
    simulateDelay: false,
    delayMs: 4000,
    logPaging: true,
};
