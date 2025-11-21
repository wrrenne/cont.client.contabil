import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuditoriaUser } from 'src/app/contabil/models/obrigacoes';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { DashIfEmptyPipe } from 'src/app/shared/pipes';
import { Vars } from '../../../../shared/variables';

@Component({
    selector: 'obr-users-auditoria-table',
    templateUrl: './obr-users-auditoria-table.html',
    standalone: true,
    imports: [CommonModule, AvatarTitleComponent, DashIfEmptyPipe],
})
export class ObrUsersAuditoriaTableComponent {
    @Input() users: AuditoriaUser[];

    constructor(private vars: Vars) {}
}
