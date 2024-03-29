import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const baseUrl= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados:any[]):Usuario[]{
    return resultados.map( user => new Usuario(
        user.nombre,
        user.email,
        '',
        user.img,
        user.google, 
        user. rol,
        user.uid)
    );
  }

  private transformarHospitales(resultados:any[]):Hospital[]{
    return resultados;
  }

  private transformarMedicos(resultados:any[]):Medico[]{
    return resultados;
  }

  // http://localhost:3000/api/todo/termino
  buscarTodo(termino: string){

    const url = `${baseUrl}/todo/${termino}`;
    // console.log(termino);
    
    return this.http.get(url, this.headers);
  }

  buscar( 
    tipo: 'usuarios'|'medicos'|'hospitales', 
    termino: string
    ){
    const url = `${baseUrl}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map( (resp:any) => {

          switch(tipo){
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);

            case 'hospitales':
              return this.transformarHospitales(resp.resultados);

            case 'medicos':
              return this.transformarMedicos(resp.resultados);

            default:
              return[];
          }
        })
    )
  }

}
