import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { ApisUtilsService, ImageService, StringsService, TMicroService } from '../../services';

@Component({
    selector: 'avatar-image',
    templateUrl: './avatar-image.html',
    host: { class: 'flex items-center justify-center' },
    standalone: true,
    imports: [CommonModule, NgIcon, NgxTippyModule],
    styleUrls: ['./avatar-image.scss'],
})
export class AvatarImageComponent implements OnInit, OnDestroy {
    //cacheName: string = 'image-cache';

    imageUrl: string | null = null;

    @Input() defaultFuncionarioIcon;
    @Input() defaultUserIcon: string;
    @Input() defaultClienteIcon: string;
    @Input() defaultFuncionariosDepartamentoIcon: string;
    @Input() defaultContabilDepartamentoIcon: string;
    @Input() defaultNoIconName?: string;
    @Input() circle = true;
    @Input() rounded = false;
    @Input() border = false;

    @Input() tooltip?: string;
    @Input() tooltipPlacement: string;

    @Input() size?: string = '3.5rem';
    @Input() iconColor? = 'text-gray-800 dark:text-gray-200';
    @Input() iconClass = 'text-3xl';
    @Input() bgClass = 'bg-avatar';
    @Input() badge: 'check' | 'warning' | 'custom' | 'none' = 'none';
    @Input() badgeSize = 18;
    @Input() badgeCustom?: string;
    @Input() badgeCustomClass?: string;

    @HostBinding('style.width') get width() {
        return this.size || 'auto'; // Default to 'auto' if size is not provided
    }

    @HostBinding('style.height') get height() {
        return this.size || 'auto'; // Set the same for height or customize further
    }

    //private refreshSubscription: Subscription
    //@Input() refreshObservable: Observable<void>;

    constructor(
        private apisUtilsService: ApisUtilsService,
        private imageService: ImageService,
        private stringsService: StringsService,
    ) {
        this.defaultFuncionarioIcon = 'bootstrapPersonFill';
        this.defaultUserIcon = 'ionPersonOutline';
        this.defaultClienteIcon = 'bootstrapCamera';
        this.defaultFuncionariosDepartamentoIcon = 'bootstrapCamera';
        this.defaultContabilDepartamentoIcon = 'bootstrapCamera';
    }

    private _funcionarioId?: number;
    @Input() get funcionarioId() {
        return this._funcionarioId;
    }
    set funcionarioId(value: number | undefined) {
        this._funcionarioId = value;
        if (!value) return;

        this.getData();
    }

    private _clienteId?: number;
    @Input() get clienteId() {
        return this._clienteId;
    }
    set clienteId(value: number | undefined) {
        this._clienteId = value;
        if (!value) return;

        this.getData();
    }

    private _userId?: number;
    @Input() get userId() {
        return this._userId;
    }
    set userId(value: number | undefined) {
        this._userId = value;
        if (!value) return;

        this.getData();
    }

    private _funcionariosDepartamentoId?: number;
    @Input() get funcionariosDepartamentoId() {
        return this._funcionariosDepartamentoId;
    }
    set funcionariosDepartamentoId(value: number | undefined) {
        this._funcionariosDepartamentoId = value;
        if (!value) return;

        this.getData();
    }

    private _contabilDepartamentoId?: number;
    @Input() get contabilDepartamentoId() {
        return this._contabilDepartamentoId;
    }
    set contabilDepartamentoId(value: number | undefined) {
        this._contabilDepartamentoId = value;
        if (!value) return;

        this.getData();
    }

    //private _imageFilename?: string
    //@Input() get imageFilename() {
    //    return this._imageFilename
    //}
    //set imageFilename(value: string | undefined) {
    //    this._imageFilename = value
    //    if (!value) return

    //    this.getData()
    //}

    @Input() icon: string;

    private _iconFilename?: string;
    @Input() get iconFilename() {
        return this._iconFilename;
    }
    set iconFilename(value: string | undefined) {
        this._iconFilename = value;
        if (!value) return;

        this.getData();
    }

    private _avatarFileName?: string;
    @Input() get avatarFileName() {
        return this._avatarFileName;
    }
    set avatarFileName(value: string | undefined) {
        this._avatarFileName = value;
        if (!value) return;

        this.getData();
    }

    private _logotipoFilename?: string;
    @Input() get logotipoFilename() {
        return this._logotipoFilename;
    }
    set logotipoFilename(value: string | undefined) {
        this._logotipoFilename = value;
        if (!value) return;

        this.getData();
    }

    ngOnInit() {
        //    if (this.refreshObservable) {
        //        this.refreshSubscription = this.refreshObservable.subscribe(() => { this.getData() })
        //    }
    }

    ngOnDestroy() {
        //    if (this.refreshObservable && this.refreshSubscription)
        //        this.refreshSubscription.unsubscribe()
    }

    getImageIconFullPath(): string {
        return `${this.apisUtilsService.getFileServerUrl()}/images/icons/${this.iconFilename}`;
    }

    getImageLogotipoFullPath(): string {
        return `${this.apisUtilsService.getFileServerUrl()}/images/logotipos/${this.logotipoFilename}`;
    }

    getImageAvatarFullPath(): string {
        return `${this.apisUtilsService.getFileServerUrl()}/images/avatar/${this.avatarFileName}`;
    }

    //getImageFilenameFullPath(): string {
    //    return `${this.apisUtilsService.getFileServerUrl()}/images/icons/${this.imageFilename}`
    //}

    getData(): void {
        var url: string | null = null;

        if (this.avatarFileName) {
            url = `${this.apisUtilsService.getFileServerUrl()}/avatar/${this.avatarFileName}`;
        } else if (this.funcionarioId) {
            url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarFuncionarioDownload/${this.funcionarioId}`;
        } else if (this.userId) {
            url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarUserDownload/${this.userId}`;
        } else if (this.clienteId) {
            url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarCadastroDownload/${this.clienteId}`;
        } else if (this.funcionariosDepartamentoId) {
            url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarFuncionariosDepartamentoDownload/${this.funcionariosDepartamentoId}`;
        } else if (this.contabilDepartamentoId) {
            url = `${this.apisUtilsService.getApiUrl(TMicroService.ApiAvatar)}/Avatar/AvatarContabilDepartamentoDownload/${this.contabilDepartamentoId}`;
        }

        this.imageUrl = url;
        //    if (url != null) {
        //        this.imageService.getImage(url).subscribe(({ url, status }) => {

        //            //if (status === 304) {
        //            //    console.log('Using cached avatar.');
        //            //}

        //            if (url) {
        //                this.imageUrl = url;
        //            } else {
        //                this.imageUrl = null; // Show the default icon
        //            }
        //        });
        //    }
    }

    onImageError(): void {
        // Handle cases where the image fails to load
        this.imageUrl = null;
    }

    getDefaultIcon(): string {
        if (this.funcionarioId != null) return this.defaultFuncionarioIcon;
        if (this.userId != null) return this.defaultUserIcon;
        if (this.clienteId != null) return this.defaultClienteIcon;
        if (this.funcionariosDepartamentoId != null) return this.defaultFuncionariosDepartamentoIcon;
        if (this.contabilDepartamentoId != null) return this.defaultContabilDepartamentoIcon;
        return '';
    }

    getDefaultIconNameInitials() {
        return this.stringsService.getInitials(this.defaultNoIconName!, true);
    }
}
