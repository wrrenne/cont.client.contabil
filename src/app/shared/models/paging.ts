export class Paging<T> {
    page!: number
    pagetotal!: number
    total!: number
    title: string | undefined
    subTitle: string | undefined
    countDescription: string | undefined
    rowsPerPage: number | undefined
    obj: any
    list!: T[]
}

export class PageItem {
    id: number | undefined;
    image!: string;
    title!: string;
    description!: string;
    obj!: any;
}
