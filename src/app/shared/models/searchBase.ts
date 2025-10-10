import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ListItem, ServiceLastItemsBase } from '.'
import { EncryptionService } from '../services'
import { StringsService } from '../services/strings.service'

@Component({
    template: ''
})

export abstract class SearchBase implements OnInit {

    datas: ListItem[] = []
    lastItemDatas: ListItem[] = []
    stringsService: StringsService
    encryptionService: EncryptionService
    route: ActivatedRoute

    @Output() itemOnClick = new EventEmitter<ListItem>()

    constructor(
        public injector: Injector,
        public service: ServiceSearchBase,
        public lastItemsService: ServiceLastItemsBase
    ) {
        this.stringsService = this.injector.get(StringsService)
        this.encryptionService = this.injector.get(EncryptionService)
        this.route = this.injector.get(ActivatedRoute)
    }

    ngOnInit(): void {
        this.getLastItemsData()
    }

    @Input() search(q: string) {
        this.getData(q)
    }

    getLastItemsData() {
        this.lastItemDatas = []

        this.lastItemsService.getLastItems().subscribe(
            res => {
                for (let i = 0; i < res.obj.length; i++) {
                    this.lastItemDatas.push(res.obj[i])
                }
            })
    }

    getData(q: string) {
        this.datas = []

        if (q != '') {
            this.service.getSearch(q).subscribe(
                res => {
                    for (let i = 0; i < res.obj.length; i++) {
                        this.datas.push(res.obj[i])
                    }
                })
        }
    }

    getEncryptedId(id: number): string {
        return this.encryptionService.encrypt(id)
    //    return this.encryptionService.set(id)
    }

    itemClick(item: ListItem) {
        this.itemOnClick.emit(item)
    }
}
