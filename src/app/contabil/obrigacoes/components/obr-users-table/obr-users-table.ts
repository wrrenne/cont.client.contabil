import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { PerfilTagComponent } from 'src/app/contabil/components/perfil-tag/perfil-tag';
import { AuditoriaUser } from 'src/app/contabil/models/obrigacoes';
import { AvatarIconEmptyComponent } from 'src/app/shared/controls/avatar-icon-empty/avatar-icon-empty';
import { AvatarIconComponent } from 'src/app/shared/controls/avatar-icon/avatar-icon';
import { AvatarImageGroupComponent } from 'src/app/shared/controls/avatar-image-group/avatar-image-group';
import { AvatarTitleComponent } from 'src/app/shared/controls/avatar-title/avatar-title';
import { PercentageBarComponent } from 'src/app/shared/controls/percentage-bar/percentage-bar';
import { Vars } from '../../../../shared/variables';

@Component({
    selector: 'obr-users-table',
    templateUrl: './obr-users-table.html',
    standalone: true,
    imports: [
        CommonModule,
        InfiniteScrollDirective,
        AvatarTitleComponent,
        RouterLink,
        PercentageBarComponent,
        AvatarIconComponent,
        AvatarImageGroupComponent,
        AvatarIconEmptyComponent,
        PerfilTagComponent,
    ],
})
export class ObrUsersTableComponent {
    @Input() users: AuditoriaUser[];

    constructor(private vars: Vars) {}
}
