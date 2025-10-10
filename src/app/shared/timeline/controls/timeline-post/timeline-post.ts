import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { PostPageItem } from '../../models/pagings';
import { EncryptionService } from '../../../services';
import { environment } from '../../../../../environments/environment';
import { TPostTipo } from '../../enums';
import { SolicitacaoGrupo } from '../../models';
import { TimelinesService } from '../../services/timelines.service';
import { TimelineCommentsComponent } from '../timeline-comments/timeline-comments';
import { FileServerImageComponent } from '../../../controls/file-server-image/file-server-image';
import { AvatarImageComponent } from '../../../controls/avatar-image/avatar-image';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'timeline-post',
    templateUrl: './timeline-post.html',
    standalone: true,
    imports: [CommonModule, RouterLink, TimelineCommentsComponent, FileServerImageComponent, AvatarImageComponent]
})
export class TimelinePostComponent {

    @Input() post: PostPageItem
    @Input() solicitacaoGrupos?: SolicitacaoGrupo[]
    @ContentChild('conteudoObj') conteudoObj: TemplateRef<any>;

    TPostTipo = TPostTipo

    constructor(
        private encryptionService: EncryptionService,
        private timelinesService: TimelinesService
    ) {
    }

    getEncryptedId(id: number | undefined): string {
        return this.encryptionService.encrypt(<number>id)
        //return this.encryptionService.set(<number>id)
    }

    get isDebug(): boolean {
        return environment.debug
    }

    commented(e: any) {
        if (!this.post.comments)
            this.post.comments = []

        this.post.comments.push(e)
    }

    postCommentsClick() {
        this.timelinesService.commentsByPostIdGet(<number>this.post.id).subscribe(x => {
            this.post.comments = x.obj
        })
    }
}
