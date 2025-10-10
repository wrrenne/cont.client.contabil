import { Component, Injector, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
//import { TDashboardWidget } from '../../../ponto-shared/models/enums/enums';
import { FormsModule } from '@angular/forms';
import { TUserPrefTipo } from '../../../shared/control/models/enums';
import { UserPreferencesService } from '../../../shared/control/userPreferences/services/userPreferences.service';
import { ModalBaseComponent } from '../../../shared/controls/modal-base/modal-base';
import { Vars } from '../../../shared/variables';

@Component({
    selector: 'widget-config-modal',
    templateUrl: './widget-config-modal.html',
    standalone: true,
    imports: [FormsModule, NzCheckboxModule],
})
export class WidgetConfigModalComponent extends ModalBaseComponent implements OnInit {
    store: any;
    isDark: boolean;

    //TDashboardWidget = TDashboardWidget

    constructor(
        injector: Injector,
        public storeData: Store<any>,
        private vars: Vars,
        private userPreferencesService: UserPreferencesService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.initStore();
        this.loadSelectionFromDashboard();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
                this.isDark = this.store.theme === 'dark' || this.store.isDarkMode ? true : false;
            });
    }

    // track checkbox state per widget
    selection: Record<string, boolean> = {};

    onWidgetToggle(checked: any, widgetId: number) {
        this.userPreferencesService.userPrefSave(TUserPrefTipo.DashboardWidgets, widgetId.toString(), checked, !checked).subscribe((_) => {
            // normalize existing dashboard or create default
            const current = this.vars.dashBoard ?? { widgets: [] as number[] };

            // use a Set to avoid duplicates
            const widgetSet = new Set<number>(current.widgets);

            if (checked) {
                widgetSet.add(widgetId);
            } else {
                widgetSet.delete(widgetId);
            }

            // persist updated dashboard
            this.vars.dashBoard = {
                widgets: Array.from(widgetSet),
            };

            // keep selection model in sync if you're using it elsewhere
            this.selection[widgetId] = checked;
        });
    }

    private loadSelectionFromDashboard() {
        const dashboard = this.vars.dashBoard;

        // clear existing selection
        this.selection = {};

        if (dashboard?.widgets) {
            for (const widgetId of dashboard.widgets) {
                this.selection[widgetId] = true;
            }
        }
    }
}
