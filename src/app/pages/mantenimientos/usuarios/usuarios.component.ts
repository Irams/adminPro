import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs: Subscription;
  public paginaDesde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private buscarServ: BusquedasService,
               private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imgSubs,unsubscribe();
  }
  
  ngOnInit(): void {
    this.cargarUsuarios(); 

    this. imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarUsuarios() );   
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.paginaDesde)
      .subscribe( ({total, usuarios}) =>{
        this.totalUsuarios = total;
        if(usuarios.length !== 0){
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
        // this.totalUsuarios = total;
        // this.usuarios = usuarios;
        // this.usuariosTemp = usuarios;
        // this.cargando = false;
        
      })
  }

  cambiarPagina(valor: number){
    this.paginaDesde += valor;

    if(this.paginaDesde < 0){
      this.paginaDesde = 0;
    }else if(this.paginaDesde >= this.totalUsuarios){
      this.paginaDesde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino:string){
    // console.log(termino);
    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }
    this.buscarServ.buscar('usuarios', termino)
            .subscribe(resp => {
              this.usuarios = resp;
            });
    return[];
  }

  eliminarUsuario(usuario: Usuario){
    // console.log(this.usuarioService.uid);
    
    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borarse a si mismo!', 'error');
    }
     
      Swal.fire({
        title: 'Borrar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuarioService.eliminarUsuario(usuario)
          .subscribe( resp => {
                  this.cargarUsuarios();
                  Swal.fire(
                    'Borrado!',
                    `El usuario ${usuario.nombre} ha sido eliminado`,
                    'success'
                  );
                });                   
        }   
      })
      return[];    
  }

  cambiarRol(usuario: Usuario){
    // console.log(usuario);
    this.usuarioService.guardarUsuario(usuario)
          .subscribe(resp => {
            console.log(resp);
            
          })    
  }

  abrirModal(usuario:Usuario){
    // console.log(usuario);
    
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
function unsubscribe() {
  throw new Error('Function not implemented.');
}

