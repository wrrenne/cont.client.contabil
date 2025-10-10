import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApisUtilsService, StringsService } from '../../services';


@Component({
    selector: 'file-server-site-logotipo',
    standalone: true,
    imports: [],
    templateUrl: './file-server-site-logotipo.html'
})
export class FileServerSiteLogotipoComponent {

    private _auto: boolean = false
    @Input() get auto() {
        return this._auto
    }
    set auto(value: boolean) {
        this._auto = value
        this.initStore();
    }

    @Input() isDark?: boolean = undefined
    @Input() isBlack?: boolean = undefined
    @Input() imageHeight: string
    //@HostBinding('style.height.px') @Input() height: number;

    @Input() src: string

    constructor(
        private storeData: Store<any>,
        private apisUtilsService: ApisUtilsService,
        private stringsService: StringsService) {
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                if (this.auto)
                    this.isDark = d.theme === 'dark' || d.isDarkMode ? true : false;;
            });
    }

    getSrc() {
        var parts = this.stringsService.extractFilenameParts(this.src)

        return `${this.apisUtilsService.getFileServerUrl()}/site/logotipos/${parts.name}${(this.isDark === true ? '-dark' : this.isDark === false ? '-light' : this.isBlack === true ? '-black' : this.isBlack === false ? '-white' : '')
    }.${ parts.extension }`
    }
}
