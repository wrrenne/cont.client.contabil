import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

// Deep clone original locale data
const customPt: any = JSON.parse(JSON.stringify(pt));

// --- Fix abbreviated months (jan., fev., ...) ---
if (customPt[1] && customPt[1][1]) {
    customPt[1][1] = customPt[1][1].map((m: string) =>
        m ? m.replace(/\.$/, '') : m
    );
}

// --- Fix abbreviated days (seg., ter., ...) ---
if (customPt[2] && customPt[2][1]) {
    customPt[2][1] = customPt[2][1].map((d: string) =>
        d ? d.replace(/\.$/, '') : d
    );
}

/**
 * Registers a modified pt-BR locale without dots in abbreviated
 * month and day names.
 */
export function registerPtBrNoDotLocale(): void {
    registerLocaleData(customPt, 'pt-BR');
}
