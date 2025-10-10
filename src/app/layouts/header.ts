import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { toggleAnimation } from 'src/app/shared/animations';
import { environment } from '../../environments/environment';
import { AvatarImageComponent } from '../shared/controls/avatar-image/avatar-image';
import { FileServerSiteLogotipoComponent } from '../shared/controls/file-server-site-logotipo/file-server-site-logotipo';
import { MenuService } from '../shared/services';
import { AppService } from '../shared/services/app.service';
import { Vars } from '../shared/variables';
import { ActivitiesHeaderComponent } from './extend/activities-header/activities-header';
import { AppSearchComponent } from './extend/app-search/app-search';
import { ProfileDrawerComponent } from './extend/profile-drawer/profile-drawer';
import { WidgetConfigModalComponent } from './extend/widget-config-modal/widget-config-modal';

@Component({
    selector: 'header',
    templateUrl: './header.html',
    standalone: true,
    providers: [NzModalService],
    imports: [
        CommonModule,
        NzModalModule,
        NzDrawerModule,
        FileServerSiteLogotipoComponent,
        ActivitiesHeaderComponent,
        AvatarImageComponent,
        NgIcon,
        AppSearchComponent,
    ],
    animations: [toggleAnimation],
})
export class HeaderComponent {
    store: any;
    search = false;

    @ViewChild('menuContainer', { static: true }) menuContainer: ViewContainerRef;
    menuTemplate$: Observable<TemplateRef<any> | null>;

    constructor(
        private menuService: MenuService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
        private modalService: NzModalService,
        public vars: Vars,
        private drawerService: NzDrawerService,
    ) {
        this.menuTemplate$ = this.menuService.menuTemplate$;
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    get rootFolder() {
        return '/' + environment.rootFolder;
    }

    openWidgetConfig() {
        var modal = this.modalService.create({
            nzContent: WidgetConfigModalComponent,
            nzWidth: 620,
            nzClosable: false,
            nzFooter: null,
        });

        modal.afterClose.subscribe((x: string) => {
            if (x) {
            }
        });
    }

    openProfileModal() {
        this.drawerService.create({
            nzContent: ProfileDrawerComponent,
            nzTitle: '',
            nzPlacement: 'right',
            nzClosable: false,
            nzWidth: 340,
            nzWrapClassName: 'bg-slate-100',
        });
    }
}
