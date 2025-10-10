import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ControlService } from '../../../control/services/control.service';
import { SistemaTipo } from '../../../models';
import { LoginInput } from '../../../models/inputs';
import { EncryptionService, HostDefault } from '../../../services';
import { Vars } from '../../../variables';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'logindirect',
    template: ''
})
export class LoginDirectPage<T> implements OnInit {

    //store: any;
    //currYear: number = new Date().getFullYear();

    //firstFormGroup: FormGroup
    //protected loading: boolean
    protected sistemaTipo: SistemaTipo = SistemaTipo.Nenhum
    //protected dateUtils: DateUtilsService
    //protected usersService: UsersService<T>
    protected router: Router
    protected route: ActivatedRoute
    private controlService: ControlService
    //private formBuilder: FormBuilder
    protected vars: Vars
    showLoader = false
    //public storeData: Store<any>
    //private appSetting: AppService
    //private notification: NzNotificationService
    private encryptionService: EncryptionService
    notification: any;

    loginError: boolean = false;

    constructor(
        injector: Injector
    ) {
        //this.loading = true

        //this.dateUtils = injector.get(DateUtilsService)
        //this.usersService = injector.get(UsersService)
        this.router = injector.get(Router)
        this.route = injector.get(ActivatedRoute)
        this.controlService = injector.get(ControlService)
        this.encryptionService = injector.get(EncryptionService)
        this.vars = injector.get(Vars)
        //this.formBuilder = injector.get(FormBuilder)

        //this.storeData = injector.get(Store<any>)
        //this.appSetting = injector.get(AppService)
        this.notification = injector.get(NzNotificationService)
    }

    ngOnInit(): void {
        const urlParametrs = combineLatest([this.route.params,
        this.route.queryParams], (params, queryParams) => ({
            ...params, ...queryParams
        }));

        urlParametrs.subscribe(r => {
            if (r['u'] && r['p']) {
                if (r['s']) { // recebeu o tipo de sistema na querystring
                //    this.vars.sistemaId = <SistemaTipo>+this.encryptionService.get(decodeURIComponent(r['s']), true)
                    this.vars.sistemaId = <SistemaTipo>this.encryptionService.decrypt(decodeURIComponent(r['s']), true)
                }
                else {
                    this.vars.sistemaId = undefined
                }

                this.login(
                    this.encryptionService.decrypt(decodeURIComponent(r['u']), true),
                    this.encryptionService.decrypt(decodeURIComponent(r['p']), true),
                    r['c'] ? this.encryptionService.decrypt(decodeURIComponent(r['c']), true) : undefined
                )
            }
        });
    }

    login(userId: string, pwd: string, cadastroId?: number, sistemaId?: SistemaTipo) {
        const l: LoginInput =
        {
            u: userId,
            p: pwd,
            c: cadastroId,
            sistemaId: sistemaId ?? this.sistemaTipo
        }

        this.showLoader = true
        this.controlService.login(l).subscribe(x => {
            this.showLoader = false

            if (x.errorMessage == null) {
                this.vars.token = x.obj.token

                // login via painel ou apenas usuario acessa apenas 1 sistema ou se acessar mais de 1 sistema, obteve o cadastroId via querystring
                if (!x.obj.sistemasCount || x.obj.sistemasCount == 1) {
                    this.userPainelGet(<number>x.obj.userId, x.obj.cadastroId)
                }
                else {
                    // mais de 1 sistema, redireciona ao painel para o usuario selecionar o cadastro
                    this.redirectToPainel(l.u, l.p)
                }
            }
            else {
                //this.createNotification(x.errorMessage.text)
                this.loginError = true

                this.router.navigate(['/login']);
            }
        })
    }

    redirectToPainel(email: string, pwd: string): void {
        const queryParams = new URLSearchParams({
            u: encodeURIComponent(this.encryptionService.encrypt(email, true)),
            p: encodeURIComponent(this.encryptionService.encrypt(pwd, true)),
            s: encodeURIComponent(this.encryptionService.encrypt(this.sistemaTipo, true)),
        //    u: encodeURIComponent(this.encryptionService.set(email, true)),
        //    p: encodeURIComponent(this.encryptionService.set(pwd, true)),
        //    s: encodeURIComponent(this.encryptionService.set(this.sistemaTipo, true)),
        });

        window.location.href = this.getLink() + '?' + queryParams.toString();
    }

    getLink(): string {
        if (environment.debug) {
            return 'http://localhost:4217/painel/login/direct'
        }
        else {
            return `${HostDefault}/painel/login/direct`
        //    return 'http://www.deskspace.com.br/painel/login/direct'
        }
    }

    userPainelGet(userId: number, cadastroId?: number): void {}

    //get rootFolder() {
    //    return environment.rootFolder
    //}

    createNotification(message: string): void {
        this.notification.create(
            'error',
            'Login',
            message
        );
    }
}
