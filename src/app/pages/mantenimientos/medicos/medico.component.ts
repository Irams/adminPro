import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor( private fb: FormBuilder,
               private  hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required ],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
          .subscribe( hospitalId => {
            // console.log(hospitalId);
            this.hospitalSeleccionado = this.hospitales.find( hosp => hosp._id === hospitalId );
            // console.log(this.hospitalSeleccionado);           
          })
  }

  cargarMedico(id: string){

    if( id === 'nuevo'){
      return;
    }
    this.medicoService.getMedicoById(id)
        .pipe(
          delay(100)
        )
        .subscribe( medico => {
          // console.log(medico);
          if (!medico) {
            return this.router.navigateByUrl('/dashboard/medicos');
          }
          const {nombre, hospital: {_id}} = medico;
          // console.log(nombre, _id);
          this.medicoSeleccionado = medico;
          return this.medicoForm.setValue({nombre, hospital: _id});
        })
        
        
  }


  cargarHospitales(){
    this.hospitalService.getHospitalesTodos()
        .subscribe( ({ hospitales }) => {
          // console.log(hospitales);          
          this.hospitales = hospitales;
        });
  }

  guardarMedico(){

    const {nombre} = this.medicoForm.value

    if(this.medicoSeleccionado){
      //Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actalizarMedico(data)
          .subscribe( resp => {
            // console.log(resp);
            Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
          })
    }else{
      //Crear
      this.medicoService.crearMedico( this.medicoForm.value )
      .subscribe( (resp:any) => {
        Swal.fire('Médico creado', nombre, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
          })
    }

    
  }

}


