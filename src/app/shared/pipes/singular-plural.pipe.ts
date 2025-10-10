import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'singularPlural',
    standalone: true
})
export class FormatSingularPluralPipe implements PipeTransform {
//<div class="ponto-box-tratamento flex items-center justify-end"[ngClass] = "espelhoUtilsService.getCalculoStatusCss(status)" > {{ apontamento.faltaDiaNaoTratado | singularPlural : '1 dia' : 'dias': '' }}</div>

  transform(value: number, singular: string, plural: string, nenhum: string): any {
    return value == 1 ? `${singular}` : value > 0 ? `${value} ${plural}` : nenhum
  }

}
