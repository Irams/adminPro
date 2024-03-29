import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusquedasService } from '../../services/busquedas.service';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService, ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.params;
    // console.log(params);
    
    this.activatedRoute.params
          .subscribe( ({termino}) =>{
            // console.log(termino);
            this.busquedaGlobal(termino);
          });
  }

  busquedaGlobal(termino: string){
    this.busquedasService.buscarTodo(termino)
        .subscribe((resp:any) => {
          // console.log(resp.ok);
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.hospitales;
          // console.log(resp);
          
        })
  }

  abrirMedico( medico: Medico ){

  }

}
