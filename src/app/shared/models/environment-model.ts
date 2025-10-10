import { SistemaTipo } from './sistemaTipo';

export interface EnvironmentModel {
    production: boolean;
    debug: boolean;
    useEncryption?: boolean;
    sistemaPrefix: string;
    rootFolder: string;
    sistema: SistemaTipo;
    simulateDelay: boolean;
    delayMs: number;
    logPaging: boolean;
    googleMapsApiKey?: string;
}
