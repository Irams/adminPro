import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private usuariosService: UsuarioService,
               private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // console.log('adminguard');
      // return (this.usuariosService.rol == 'ADMIN_ROLE') ? true : false;
    
      if (this.usuariosService.rol == 'ADMIN_ROLE' ) {
        return true;
      }else{
        this.router.navigateByUrl('/dashboard');
        return false;
      }


  }
  
}
