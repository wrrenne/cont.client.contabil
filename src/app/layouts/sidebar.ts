import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { VarsApp } from '../contabil/variables';
import { slideDownUp } from '../shared/animations';
import { AvatarIconComponent } from '../shared/controls/avatar-icon/avatar-icon';
import { FileServerSiteLogotipoComponent } from '../shared/controls/file-server-site-logotipo/file-server-site-logotipo';
import { DateUtilsService } from '../shared/services';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    standalone: true,
    imports: [CommonModule, RouterLink, OverlayscrollbarsModule, NgIcon, AvatarIconComponent, FileServerSiteLogotipoComponent, AvatarIconComponent],
    animations: [slideDownUp],
})
export class SidebarComponent implements OnInit, OnDestroy {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    parentDropdown: string = '';

    naoTratadosCount: number;
    solicitacoesCount: number;
    funcionariosCount: number;
    departamentosCount: number;

    fechamentoWarning = false;

    private periodoSubscription: Subscription;

    constructor(
        public storeData: Store<any>,
        public router: Router,
        private vars: VarsApp,
        private dateUtilsService: DateUtilsService,
    ) {
        this.initStore();
        this.activeDropdown = vars.sidebarConfig;
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.setActiveDropdown();

        this.fechamentoWarning = this.dateUtilsService.getToday() > this.vars.dataFinal!;

        this.startNaoTratadosCountNotification();
        this.startFuncionariosCountNotification();

        this.getSolicitacoesWarning();
        this.getDepartamentosCountWarning();

        // chama ao mudar o periodo de apontamento no sistema
        //    this.periodoSubscription = this.vars.periodo$.subscribe(_ => {
        //        this.getNaoTratadosCount()
        //        this.getFuncionariosCount()

        //        this.getSolicitacoesWarning()
        //        this.getDepartamentosCountWarning()
        //    });
    }

    ngOnDestroy() {
        if (this.periodoSubscription) this.periodoSubscription.unsubscribe();
    }

    startNaoTratadosCountNotification() {
        // inicia o subscribe
        //    this.tratamentoNotification.count$.subscribe(_ => {
        //        this.getNaoTratadosCount()
        //    });
        //    // chama a quantidade de não tratados
        //    this.getNaoTratadosCount()
    }

    getNaoTratadosCount() {
        //    this.apontamentosService.apontamentoNaoTratadoCountTodosGet().subscribe(x => {
        //        this.naoTratadosCount = x.obj.total;
        //    })
    }

    startFuncionariosCountNotification() {
        // inicia o subscribe
        //this.funcionariosNotification.count$.subscribe(_ => {
        //    this.getFuncionariosCount()
        //});
        // chama a quantidade de funcionarios
        //this.getFuncionariosCount()
    }

    // retorna a quantidade de funcionarios
    getFuncionariosCount() {
        //    this.funcionariosService.cadastroFuncionariosCountGet().subscribe(x => {
        //        this.funcionariosCount = x.obj
        //    })
    }

    getDepartamentosCountWarning() {
        //    this.funcionariosService.cadastroDepartamentosCountGet().subscribe(x => {
        //        this.departamentosNotification.notifyCount(x.obj)
        //        this.departamentosNotification.count$.subscribe(status => {
        //            if (status) {
        //                this.departamentosCount = status;
        //            }
        //        });
        //    })
    }

    getSolicitacoesWarning() {
        //    this.apontamentosService.apontamentoSolicitacoesCountGet().subscribe(x => {
        //        this.solicitacoesNotification.notifyCount(x.obj.solicitacoes)
        //        this.solicitacoesNotification.count$.subscribe(status => {
        //            if (status) {
        //                this.solicitacoesCount = status;
        //            }
        //        });
        //    })
    }

    setActiveDropdown() {
        const selector = document.querySelector('.sidebar ul a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            this.activeDropdown.push(name);
        }

        this.vars.sidebarConfig = this.activeDropdown;
    }

    getYear() {
        return new Date().getFullYear();
    }

    get isProduction(): boolean {
        return environment.production;
    }

    get disableAll(): boolean {
        return false;
        //    return this.vars.getStatusFlag('semDiaApontamento')
        //        || this.vars.getStatusFlag('semFolhaPagamento')
        //        || this.vars.getStatusFlag('semFuncionarios')
        //        || this.vars.getStatusFlag('semHorarios')
        //        || this.vars.getStatusFlag('semRegras')
    }
}
