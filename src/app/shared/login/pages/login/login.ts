import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../../../environments/environment';
import { EmailService } from '../../../control/services/email.service';
import { SistemaTipo } from '../../../models';
import { DateUtilsService } from '../../../services';
import { AppService } from '../../../services/app.service';
import { LoginDirectPage } from '../logindirect/logindirect';

import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { FileServerSiteLogotipoComponent } from '../../../controls/file-server-site-logotipo/file-server-site-logotipo';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, FileServerSiteLogotipoComponent],
})
export class LoginPage<T> extends LoginDirectPage<T> implements OnInit {
    store: any;
    currYear: number = new Date().getFullYear();

    isReset = false;
    resetError = false;
    emailSent = false;
    emailEnviadoPara?: string;
    logoImage: string;

    firstFormGroup: FormGroup;
    resetPasswordForm: FormGroup;

    private emailService: EmailService;
    protected dateUtils: DateUtilsService;
    private formBuilder: FormBuilder;

    public storeData: Store<any>;
    private appSetting: AppService;

    contratando = false;

    constructor(injector: Injector) {
        super(injector);

        this.dateUtils = injector.get(DateUtilsService);
        this.formBuilder = injector.get(FormBuilder);

        this.storeData = injector.get(Store<any>);
        this.appSetting = injector.get(AppService);
        this.notification = injector.get(NzNotificationService);
        this.emailService = injector.get(EmailService);

        //    this.isReset = true
        //    this.emailSent = true
        //    this.emailEnviadoPara = 'teste@teste.com.br'
    }

    override ngOnInit(): void {
        this.createForm();

        this.initStore();

        this.logoImage = this.getLogoUrl();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            this.contratando = this.encryptionService.decrypt(r['c']) != undefined;
        });
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            u: [null, Validators.required],
            p: [null, Validators.required],
        });

        this.resetPasswordForm = this.formBuilder.group({
            email: [null, Validators.required],
        });
    }

    submit() {
        this.login(this.firstFormGroup.get('u')?.value, this.firstFormGroup.get('p')?.value);
    }

    resetPasswordSubmit() {
        this.emailEnviadoPara = this.resetPasswordForm.get('email')?.value;

        this.emailService.passwordResetEmailSend({ email: this.resetPasswordForm.get('email')?.value, sistemaId: this.sistemaTipo }).subscribe((x) => {
            this.emailSent = true;
        });
    }

    reset() {
        this.isReset = !this.isReset;
    }

    retornar() {
        this.resetError = false;
        this.loginError = false;
        this.isReset = false;
        this.emailSent = false;
        this.firstFormGroup.controls['u'].setValue(this.emailEnviadoPara);
        this.emailEnviadoPara = undefined;
    }

    get rootFolder() {
        return environment.rootFolder;
    }

    getLogoUrl(): string {
        switch (environment.sistema) {
            case SistemaTipo.Ponto:
                return 'deskspace-ponto.png';
            case SistemaTipo.Contabil:
                return 'deskspace-contabil.png';
            case SistemaTipo.Financeiro:
                return 'deskspace-financeiro.png';
            case SistemaTipo.Holerite:
                return 'deskspace-holerite.png';
            case SistemaTipo.Funcionario:
                return 'deskspace.png';
            case SistemaTipo.Revenda:
                return 'deskspace.png';
            default:
                return '';
        }
    }

    newAccountGo() {
        this.router.navigate(['/newaccount/']);
    }
}
