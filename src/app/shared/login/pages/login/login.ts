import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { environment } from '../../../../../environments/environment';
import { EmailService } from '../../../control/services/email.service';
import { SistemaTipo } from '../../../models';
import { DateUtilsService } from '../../../services';
import { AppService } from '../../../services/app.service';
import { LoginDirectPage } from '../logindirect/logindirect';

import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { UsersService } from 'src/app/shared/control/services/users.service';
import { HtmlUtilsService } from 'src/app/shared/services/htmlUtils.service';
import { FileServerSiteLogotipoComponent } from '../../../controls/file-server-site-logotipo/file-server-site-logotipo';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, FileServerSiteLogotipoComponent],
})
export class LoginPage<T> extends LoginDirectPage<T> implements OnInit {
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
    private usersService: UsersService;
    private appService: AppService;
    private htmlUtils: HtmlUtilsService;

    cadastroId?: number;
    userId?: number;
    email?: string;

    constructor(injector: Injector) {
        super(injector);

        this.dateUtils = injector.get(DateUtilsService);
        this.formBuilder = injector.get(FormBuilder);

        this.appService = injector.get(AppService);
        this.notification = injector.get(NzNotificationService);
        this.emailService = injector.get(EmailService);
        this.usersService = injector.get(UsersService);
        this.htmlUtils = injector.get(HtmlUtilsService);
    }

    override ngOnInit(): void {
        this.appService.initStoreData();
        this.logoImage = this.htmlUtils.getLogoUrl();

        const urlParametrs = combineLatest([this.route.params, this.route.queryParams], (params, queryParams) => ({
            ...params,
            ...queryParams,
        }));

        urlParametrs.subscribe((r) => {
            var c = this.encryptionService.decrypt(r['c'], true);
            var u = this.encryptionService.decrypt(r['u'], true);

            this.cadastroId = c ? +c : undefined;
            this.userId = u ? +u : undefined;

            if (this.userId && this.cadastroId) {
                this.usersService.userGet(this.userId, this.cadastroId, SistemaTipo.Ponto).subscribe((x) => {
                    if (x.obj) {
                        this.email = x.obj.email;
                    }

                    this.createForm();
                });
            } else {
                this.createForm();
            }
        });
    }

    createForm() {
        this.firstFormGroup = this.formBuilder.group({
            u: [this.email, Validators.required],
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

    newAccountGo() {
        this.router.navigate(['/newaccount/']);
    }
}
