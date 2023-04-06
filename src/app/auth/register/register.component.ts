import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre: ['Herberth', Validators.required ],
    email: ['herber.medina@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    password2: ['123456', [Validators.required, Validators.minLength(6)]],
    terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router) { }

  crearUsuario(){
    this.formSumitted = true;
    // console.log(this.registerForm.value);
    // console.log(this.registerForm);
    
    if(this.registerForm.valid && !this.aceptaTerminos()){
      this.usuarioService.crearUsuario( this.registerForm.value)
              .subscribe(resp=>{
                // console.log('Usuario creado!');
                
                //Navegar al dashboard
                this.router.navigateByUrl('/');
                
                // console.log(resp);
              }, (err)=> {
                //Sucede un error
                Swal.fire('Error', err.error.msg, 'error');
              });
            }else{
              return;
            }

    //Realizar el posteo
  }

  campoNoValido( campo: string ):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSumitted ){
      return true;
    }else{
      return false;
    } 
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if( (pass1 !== pass2) && this.formSumitted ){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSumitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string){

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass1Control?.setErrors({ noEsIgual: true });
      }
    }
  }

}


