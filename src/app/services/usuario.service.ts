import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { loginForm } from '../interfaces/login-form.interface';

declare const google: any;

const baseUrl= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) { }

  logout(){
    localStorage.removeItem('token');
    
    google.accounts.id.revoke( 'herber.medina@gmail.com', () =>{
      this.ngZone.run(() =>{
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true ),
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

}

