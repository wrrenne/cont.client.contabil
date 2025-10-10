import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { UserPreferencesService } from '../../shared/control/userPreferences/services/userPreferences.service';
import { TUserPrefTipo } from '../control/models/enums';
import { UserPrefItem } from '../control/models/userPreferences';

@Injectable()
export class UserConfig {

    constructor(private userPreferencesService: UserPreferencesService) {
    }

    updateValue(tipo: TUserPrefTipo, form: FormGroup, formControlName: string) {
        const value = form.get(formControlName)?.value

        if (value != this.userPreferencesService.getPrefValue(tipo)) {
            this.userPreferencesService.userPrefSave(tipo, value, false).subscribe(x => {
                this.userPreferencesService.setPrefValue(tipo, value)
                this.userConfigItemEmit({ tipo: tipo, valor: value })
            })
        }
    }

    private userConfigItemSubject = new Subject<UserPrefItem>()

    private userConfigItemEmit(n: UserPrefItem) {
        this.userConfigItemSubject.next(n);
    }

    userConfigItemObservable(): Observable<UserPrefItem> {
        return this.userConfigItemSubject.asObservable()
    }
}
