export class QueryParam {
    public q?: string
    public pg: number
    public pgtotal: number
    public queryStrings = new Map()
    public routeStrings: string[] = []

    constructor() {
        this.pg = 1
        this.pgtotal = 1
    }

    public incrementPage(): boolean {
        if (this.pg < this.pgtotal) {
            this.pg++;
            return true;
        }
        else {
            return false;
        }
    }

    public decrementPage(): boolean {
        if (this.pg > 0) {
            this.pg--;
            return true;
        }
        else
            return false;
    }

    public reset() {
        this.pg = 1;
    }
}
