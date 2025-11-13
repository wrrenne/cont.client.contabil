import { Component } from '@angular/core';
import { WidgetDoneComponent } from 'src/app/shared/controls/widget-done/widget-done';
import { TFileType } from 'src/app/shared/ged/enums/ged-enums';
import { GedService } from 'src/app/shared/ged/services/ged.service';

@Component({
    selector: 'arquivos-disponibilizados-widget',
    templateUrl: './arquivos-disponibilizados-widget.html',
    standalone: true,
    imports: [WidgetDoneComponent],
})
export class ArquivosDisponibilizadosWidgetComponent {
    count: number;

    constructor(private gedService: GedService) {}

    ngOnInit(): void {
        this.gedService.arquivosDisponibilizadosCount(TFileType.Obrigacao).subscribe((x) => {
            this.count = x.obj;
        });
    }
}
