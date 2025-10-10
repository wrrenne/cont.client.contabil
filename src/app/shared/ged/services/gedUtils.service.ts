import { Injectable } from '@angular/core';
import { TFileType } from '../enums/ged-enums';

@Injectable({
    providedIn: 'root'
})

export class GedUtilsService {

    getFileTypeIcon(tipo: TFileType, topFolder: boolean = false): string {
        if (topFolder)
            return 'ionReturnDownBackSharp'

        switch (tipo) {
            case TFileType.Pasta: return "iconoirFolder"
            case TFileType.EspelhoPonto: return "ionCalendarOutline"
            case TFileType.Apontamento: return "bootstrapCalendar2Date"
            case TFileType.Atestado: return "iconoirShoppingBagPlus"
            default:
                return "iconoirPage"
        }
    }

    getFileTypeColor(tipo: TFileType, nivel?: number, temArquivoOuPasta?: boolean): string {
        var res = 'text-xl '

        switch (tipo) {
            case TFileType.Pasta: res += this.getFolderLabelColor(nivel!, temArquivoOuPasta!)
                break
            case TFileType.EspelhoPonto: res += "text-green-500"
                break
            case TFileType.Apontamento: res += "text-red-500"
                break
            case TFileType.Atestado: res += "text-fuchsia-500"
                break
            default:
                res += "text-black dark:text-white"
        }

        return res
    }

    getFolderLabelColor(nivel: number, temArquivoOuPasta: boolean): string {
        switch (nivel) {
            case 1:
                return 'text-blue-500 dark:text-blue-500'
            case 2:
                return 'text-yellow-500 dark:text-yellow-500'
            default:
                return (temArquivoOuPasta ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500/80 dark:text-gray-500')
        }
    }

    //getIconColor(nivel: number, temArquivoOuPasta: boolean): string {
    //    var res = 'text-xl '

    //    res += this.getDefaultLabelColor(nivel, temArquivoOuPasta)

    //    return res
    //}

    getIconBgColor(nivel: number = 0): string {
        var res = 'rounded-md '

        switch (nivel) {
            case 1:
                res += 'bg-blue-600/20 dark:bg-blue-400/20'
                break
            case 2:
                res += 'bg-yellow-600/20 dark:bg-yellow-400/20'
                break
            default:
                res += 'bg-gray-300/40 dark:bg-gray-400/20'
        }

        return res
    }

    getLabelColor(nivel: number, temArquivoOuPasta: boolean): string {
        var res = 'text-sm '

        res += this.getFolderLabelColor(nivel, temArquivoOuPasta)

        return res
    }
}
