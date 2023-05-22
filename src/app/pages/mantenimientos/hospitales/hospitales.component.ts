import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public totalHospitales: number = 0;
  public paginaDesde: number = 0;
  public hastaLimite: number = 0;
  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private buscarServ: BusquedasService, ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    this. imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarHospitales() ); 
  }

  cargarHospitales(){
    this.cargando = true;
    // this.hospitalService.cargarHospitales(this.paginaDesde, this.hastaLimite)
    this.hospitalService.cargarHospitales(this.paginaDesde)
          .subscribe(({total, hospitales}) =>{
            this.totalHospitales = total;
            if(hospitales.length !== 0){
              // const orderHosp = hospitales.orderBy();
              // console.log(orderHosp);
              
              this.hospitales = hospitales;
              this.hospitalesTemp = hospitales;
              this.cargando = false;
            }
            // console.log(this.hospitales, this.totalHospitales);
          })
  }

  // cambiarPagina(valor: number, valor2: number){
  cambiarPagina(valor: number ){
    // this.hastaLimite += valor2;
    this.paginaDesde += valor;
    if(this.paginaDesde < 0){
      this.paginaDesde = 0;
      // this.hastaLimite = 5;
      this.hastaLimite = 5;
    // }else if(this.paginaDesde >= this.totalHospitales){
    }else if(this.paginaDesde >= this.totalHospitales){
      this.paginaDesde -= valor;
    }
    this.cargarHospitales();
  }

  guardarCambios(hospital: Hospital){
    // console.log(hospital);
    this.hospitalService.actalizarHospital(hospital._id, hospital.nombre)
              .subscribe( resp=>{
                Swal.fire('Actualizado', hospital.nombre, 'success')
              })
  }

  eliminarHospital(hospital: Hospital){
    // console.log(hospital);

    Swal.fire({
      title: 'Borrar hospital?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.borrarHospital(hospital._id)
        .subscribe( resp => {
                this.cargarHospitales();
                Swal.fire(
                  'Borrado!',
                  `El hospital ${hospital.nombre} ha sido eliminado`,
                  'success'
                );
              });                   
      }   
    })
    return[];
  }

  async abrirSweetAlert(){
    const {value=''} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true,
    })
    
    if(value.trim().length > 0){
      this.hospitalService.crearHospital(value)
          .subscribe(resp => {
            // console.log(resp);
            this.cargarHospitales();
          })
    } 
  }

  crearHospital(hospital: Hospital){
    // console.log(hospital);
    this.hospitalService.crearHospital(hospital.nombre)
              .subscribe( resp => {
                Swal.fire('Creado', hospital.nombre, 'success')
              })
  }

  abrirModal(hospital: Hospital){
    // console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino:string){
    // console.log(termino);
    if(termino.length === 0){
      return this.cargarHospitales();
    }
    this.buscarServ.buscar('hospitales', termino)
            .subscribe(resp => {
              this.hospitales = resp;
            });
    return[];
  }

}
