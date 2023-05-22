import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { CargarHospital } from '../interfaces/cargar-hospitales.interfaces';
import { Hospital } from '../models/hospital.model';


const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  
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

  cargarHospitales( desde: number = 0, limite: number = 5 ){
    console.log(limite);
    
    const url = `${baseUrl}/hospitales?desde=${desde}&${limite}`;
    return this.http.get<CargarHospital>(url, this.headers)
      .pipe(
        // delay(1000),
        map(resp =>{
          // console.log(resp);
          const hospitales = resp.hospitales.map( 
            hospital => new Hospital(
              hospital.nombre,
              hospital._id,
              hospital.img,
              hospital.usuario,
               ))
            
          return {
            total: resp.total,
            hospitales,
          };
        })
        
      )       
  }

  getHospitalesTodos(){
    const url = `${baseUrl}/hospitales/todos`;
    return this.http.get<CargarHospital>(url, this.headers);
  }

  crearHospital( nombre:string ){
    const url = `${baseUrl}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);        
  }

  actalizarHospital( _id:string, nombre:string ){
    const url = `${baseUrl}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers);        
  }

  borrarHospital( _id:string ){
    const url = `${baseUrl}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);        
  }

}
