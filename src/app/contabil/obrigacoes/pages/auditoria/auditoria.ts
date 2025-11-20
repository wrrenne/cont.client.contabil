import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PageTitleComponent } from 'src/app/shared/controls/page-title/page-title';
import { AuditoriaCardsComponent } from '../../components/auditoria-cards/auditoria-cards';

@Component({
    selector: 'auditoria',
    templateUrl: './auditoria.html',
    providers: [NzModalService],
    imports: [PageTitleComponent, NzTabsModule, AuditoriaCardsComponent],
})
export class AuditoriaPage {
    constructor() {}
}
