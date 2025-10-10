import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { PageItemBase } from '.';
import { environment } from '../../../environments/environment';
import { DateUtilsService, EncryptionService } from '../services';
import { HtmlUtilsService } from '../services/htmlUtils.service';
import { StringsService } from '../services/strings.service';
import { QueryParam } from './queryParam';
import { ServicePagingBase } from './servicePagingBase';

@Component({
    template: '',
})
export abstract class PagingBase<T extends PageItemBase> implements OnInit {
    iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
    iso8601DateRegex = /^\d{4}-\d{2}-\d{2}$/;

    datas: T[] = [];
    title: string | undefined;
    subTitle: string | undefined;
    countDescription: string | undefined;
    obj: any;
    param: QueryParam;
    count = 0;
    stringsService: StringsService;
    encryptionService: EncryptionService;
    htmlUtilsService: HtmlUtilsService;
    dateUtilsService: DateUtilsService;
    route: ActivatedRoute;
    convertDatesObjects = false;
    dataResolved = false;
    loading = false;

    @Input() set pageItem(value: T | undefined) {
        if (value) {
            this.updateRow(value);
            value = undefined;
        }
    }

    @Output() itemOnClick = new EventEmitter<T>();
    @Output() titleOnChange = new EventEmitter<string>();

    private refreshSubscription: any;
    @Input() refreshObservable: Observable<void> | undefined;
    @Input() autoLoad = false;

    protected datasChanged$ = new Subject<void>(); // Notify only, no payload

    //How use datasChanged$
    //
    //this.datasChanged$.subscribe(() => {
    //    // Apply fallback to missing endHour per range
    //    this.datas = this.datas.map(entry => ({
    //        ...entry,
    //        hours: entry.marcacoes.map(range => ({
    //            ...range,
    //            endHour: range.periodo.horaFinal ?? nowMinutes,
    //        })),
    //    }));
    //});

    constructor(
        public injector: Injector,
        public service: ServicePagingBase<T>,
    ) {
        this.param = new QueryParam();
        this.stringsService = this.injector.get(StringsService);
        this.encryptionService = this.injector.get(EncryptionService);
        this.htmlUtilsService = this.injector.get(HtmlUtilsService);
        this.route = this.injector.get(ActivatedRoute);
        this.dateUtilsService = this.injector.get(DateUtilsService);
        this.convertDatesObjects = false;
    }

    @Input() search(searchParam: string) {
        this.searchData(searchParam);
    }

    ngOnInit() {
        if (this.autoLoad) this.refresh();

        if (this.refreshObservable) {
            this.refreshSubscription = this.refreshObservable.subscribe(() => {
                this.refresh();
            });
        }
    }

    ngOnDestroy() {
        if (this.refreshObservable && this.refreshSubscription) this.refreshSubscription.unsubscribe();
    }

    onScrollDown() {
        if (this.param.pg < this.param.pgtotal) {
            this.param.incrementPage();
            this.getAll(false);
        }
    }

    getAll(reset: boolean) {
        this.getData(reset);
    }

    refresh() {
        this.getAll(true);
    }

    refreshed(param: QueryParam) {
        this.param = param;
        this.getAll(true);
    }

    getData(reset: boolean) {
        if (reset) {
            this.param.pg = 1;
            this.datas = [];
        }

        this.dataResolved = false;
        this.loading = true;

        this.service.getPaging(this.param).subscribe((res) => {
            this.count = res.obj.total;

            if (this.convertDatesObjects) res.obj.list = this.dateUtilsService.convertDates(res.obj.list);

            this.datas.push(...res.obj.list);
            this.datasChanged$.next(); // Notify subscribers that datas changed

            this.title = res.obj.title;
            this.subTitle = res.obj.subTitle;
            this.countDescription = res.obj.countDescription;
            this.count = res.obj.total;

            this.loading = false;

            if (environment.logPaging) {
                console.log(['datas', res.obj]);
            }

            this.titleOnChange.emit(this.title);
            this.param.pgtotal = res.obj.pagetotal;
        });
    }

    searchData(searchParam: string): void {
        this.param.q = searchParam;
        this.getData(true);
    }

    hasMorePages(): boolean {
        return this.param.pgtotal > 0 && this.param.pg < this.param.pgtotal;
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id);
    }

    itemClick(item: T) {
        this.itemOnClick.emit(item);
    }

    clear() {
        this.datas = [];
    }

    getDataById(id: number): T | undefined {
        var i = this.datas.findIndex((y) => y.id == id);

        return i > -1 ? this.datas[i] : undefined;
    }

    getIndexById(id: number): number | undefined {
        var i = this.datas.findIndex((y) => y.id == id);

        return i > -1 ? i : undefined;
    }

    updateRow(e: T) {
        var i = this.datas.findIndex((y) => y.id == e.id);

        if (i >= 0) this.datas[i] = e;
        else this.datas.push(e);
    }

    deleteRow(e: T) {
        this.datas = this.datas.filter((y) => y.id != e.id);
    }

    deleteRowById(id: number) {
        this.datas = this.datas.filter((y) => y.id != id);
    }

    getBorderColor(cor?: string): string {
        return this.htmlUtilsService.getBorderColor(cor);
    }

    getTextColor(cor: string): string {
        return this.htmlUtilsService.getTextColor(cor);
    }

    getBgColor(cor: string): string {
        return this.htmlUtilsService.getBgColor(cor);
    }
}
