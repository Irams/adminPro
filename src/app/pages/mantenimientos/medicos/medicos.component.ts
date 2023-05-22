import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Medico } from '../../../models/medico.model';

import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit,  OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public paginaDesde: number = 0;
  public totalMedicos: number = 0;
  public medicosTemp: Medico[] =[];
  public imgSubs: Subscription;


  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private buscarServ: BusquedasService, ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this. imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarMedicos() );
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino:string){
    // console.log(termino);
    if(termino.length === 0){
      return this.cargarMedicos();
    }
    this.buscarServ.buscar('medicos', termino)
            .subscribe(resp => {
              console.log(resp);
              
              this.medicos= resp;
            });
    // return[];
  }

  cambiarPagina(valor: number){
    this.paginaDesde += valor;

    if(this.paginaDesde < 0){
      this.paginaDesde = 0;
    }else if(this.paginaDesde >= this.totalMedicos){
      this.paginaDesde -= valor;
    }
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargarMedicos(this.paginaDesde)
          .subscribe(({total, medicos}) =>{
            this.totalMedicos = total;
            
            if(medicos.length !== 0){
              this.medicos = medicos;
              this.medicosTemp = medicos;
              this.cargando = false;
            }
            // console.log(this.medicos, this.totalMedicos);
          })
  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: 'Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
        .subscribe( resp => {
                this.cargarMedicos();
                Swal.fire(
                  'Médico Borrado!',
                  `El hospital ${medico.nombre} ha sido eliminado`,
                  'success'
                );
              });                   
      }   
    })


  }

  

}
