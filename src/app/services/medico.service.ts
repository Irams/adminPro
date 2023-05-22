import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CargarMedico } from '../interfaces/cargar-medicos.interfaces';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const baseUrl= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient, ) { }

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

  cargarMedicos( desde: number = 0, limite: number = 0 ){
    // console.log(desde);
    
    const url = `${baseUrl}/medicos?desde=${desde}&${limite}`;
    return this.http.get<CargarMedico>(url, this.headers)
      .pipe(
        // delay(1000),
        map( resp =>{
          // console.log(resp);
          
          const medicos = resp.medicos.map( 
            medico => new Medico(
              medico.nombre,
              medico._id,
              medico.usuario,
              medico.hospital,
              medico.img,
               ))
            
          return {
            total: resp.total,
            medicos,
          };
        })
      )       
  }

  crearMedico( medico: {nombre:string, hospita:string} ){
    const url = `${baseUrl}/medicos`;
    return this.http.post(url, medico, this.headers);        
  }

  getMedicoById( id: string ){
    const url = `${baseUrl}/medicos/${id}`;
    return this.http.get(url, this.headers)
          .pipe(
            map( (resp:{ok: boolean, medico: Medico }) => resp.medico)
          );
  }

  actalizarMedico( medico: Medico ){
    const url = `${baseUrl}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);        
  }

  borrarMedico( _id:string ){
    const url = `${baseUrl}/medicos/${_id}`;
    return this.http.delete(url, this.headers);        
  }


}
