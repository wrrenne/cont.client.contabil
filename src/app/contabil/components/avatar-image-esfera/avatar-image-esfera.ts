import { Component, HostBinding, Input } from '@angular/core';
import { AvatarImageComponent } from '../../../shared/controls/avatar-image/avatar-image';
import { TEsfera } from '../../models/enums';

export interface AvatarImageEsferaParameter {
    esfera: TEsfera;
    uf?: string;
    municipioCodigo?: number;
}

@Component({
    selector: 'avatar-image-esfera',
    templateUrl: './avatar-image-esfera.html',
    host: { class: 'flex items-center justify-center rounded-full' },
    styleUrls: ['./avatar-image-esfera.scss'],
    standalone: true,
    imports: [AvatarImageComponent],
})
export class AvatarImageEsferaComponent extends AvatarImageComponent {
    @HostBinding('style.width') override get width() {
        return this.size || 'auto'; // Default to 'auto' if size is not provided
    }

    @HostBinding('style.height') override get height() {
        return this.size || 'auto'; // Set the same for height or customize further
    }

    private _parameter: AvatarImageEsferaParameter | undefined;
    @Input() get parameter() {
        return this._parameter;
    }
    set parameter(value: AvatarImageEsferaParameter | undefined) {
        this._parameter = value;
        switch (value?.esfera) {
            case TEsfera.Estadual:
                this.logotipoFilename = `brasao_estado_${value.uf?.toLowerCase()}.png`;
                break;
            case TEsfera.Municipal:
                this.logotipoFilename = `brasao_municipio_${value.municipioCodigo}.png`;
                break;
            case TEsfera.Federal:
                this.logotipoFilename = 'brasao_pais_1058.png';
                break;
            default:
        }
    }
}
