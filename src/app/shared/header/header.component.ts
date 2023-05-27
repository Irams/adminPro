import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario.model';

import { UsuarioService } from 'src/app/services/usuario.service';

const baseUrl = environment.base_url;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent {

  public usuario?:Usuario;

  constructor( private usuarioService: UsuarioService,
               private router: Router ) { 
    this.usuario = usuarioService.usuario;
   }

   buscar(termino: string){
    // console.log(termino);
    if (termino.length === 0 || undefined ) {
      // this.router.navigateByUrl('/dashboard');
      return;
    }
    // console.log(termino);
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
   }

  logout(){
    this.usuarioService.logout();
  }


}
