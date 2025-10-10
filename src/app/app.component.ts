import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { UserPainel } from './contabil/models/users';
import { UsersService } from './login/services/users.service';
import { Vars } from './shared/variables';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        private vars: Vars,
        private usersService: UsersService<UserPainel>,
    ) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.route),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                switchMap((route) => {
                    return route.data.pipe(
                        map((routeData: any) => {
                            const title = routeData['title'];
                            return { title };
                        }),
                    );
                }),
                tap((data: any) => {
                    let title = data.title;
                    title = (title ? title + ' | ' : '') + 'deskContador';
                    this.titleService.setTitle(title);
                }),
            )
            .subscribe();
    }

    userPainelGet(userId: number, cadastroId: number) {
        this.usersService.userPainelGet(userId, cadastroId).subscribe(
            x => {
                this.vars.loaded = true
            }
        )
    }
}
