import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Usuario } from '../models/usuario.model';
import { PerfilForm } from '../interfaces/perfil-form.interface';


declare const google: any;

const baseUrl= environment.base_url; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout(){
    localStorage.removeItem('token');
  
    if(!this.usuario.google){
      this.router.navigateByUrl('/login');
    }else{
      google.accounts.id.revoke( 'herber.medina@gmail.com', () =>{
        this.ngZone.run(() =>{
          this.router.navigateByUrl('/login');
        })
      });
    }
    
  }

  validarToken():Observable<boolean>{

    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map ( (resp:any) => {
        //desestructuramos todas las propiedades del objeto usuario
        const { email, google, nombre, rol, img='', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, rol, uid );
        // this.usuario?.imprimirUsuario();
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post(`${baseUrl}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                    
                  })
                )
  }

  actualizarPerfil( data: PerfilForm ){

    data = {
      ...data,
      rol: this.usuario.rol
    };
    
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, data, this.headers);
  }

  login( formData: loginForm ){
    return this.http.post(`${baseUrl}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('token', resp.token)
                    
                  })
                )
  }

  loginGoogle(token:string){
    return this.http.post(`${baseUrl}/login/google`, {token})
        .pipe(
          tap( (resp: any) => {
            // console.log(resp);
            localStorage.setItem('token', resp.token)
          })
        )
  }

  cargarUsuarios(desde: number = 0){
    //http://localhost:3000/api/usuarios?desde=0
    const url = `${baseUrl}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
          .pipe(
            // delay(1000),
            map(resp =>{
              // console.log(resp);
              const usuarios = resp.usuarios.map( 
                user => new Usuario(
                user.nombre,
                user.email,
                '',
                user.img,
                user.google, 
                user. rol,
                user.uid))

              return {
                total: resp.total,
                usuarios
              };
            })
          )
  }

  eliminarUsuario(usuario:Usuario){
    // console.log(usuario);
    //http://localhost:3000/api/usuarios/63d8543d265e371f7124163e
    const url = `${baseUrl}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
    
  }

  guardarUsuario( usuario: Usuario ){
    
    return this.http.put(`${baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}

