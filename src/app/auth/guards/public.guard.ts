import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanMatch, CanActivate, Router, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  // constructor(private httpClient: HttpClient) { }

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if ( isAuthenticated ) {
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    // console.log('Can Math');
    // console.log({route, segments})
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    // console.log('Can Activte');
    // console.log({ route, state })
    return this.checkAuthStatus();
  }

}
