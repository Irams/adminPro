import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public usuario: Usuario | undefined;

  constructor( public sidebarService: SidebarService,
               private usuarioService: UsuarioService ) {
    // this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
    // console.log(this.menuItems);
    
   }

  logout(){
    this.usuarioService.logout();
  }

  ngOnInit(): void {
  }

}
