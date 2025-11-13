import { Component, OnInit } from '@angular/core';
import { ControlService } from 'src/app/shared/control/services/control.service';
import { WidgetDoneComponent } from '../../../../shared/controls/widget-done/widget-done';

@Component({
    selector: 'usuarios-count-widget',
    templateUrl: './usuarios-count.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class UsuariosCountWidgetComponent implements OnInit {
    count: number;

    constructor(private controlService: ControlService) {}

    ngOnInit(): void {
        this.controlService.cadastroUsuariosCountGet().subscribe((x) => {
            this.count = x.obj;
        });
    }
}
