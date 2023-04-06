import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn?: ElementRef;

  public formSumitted = false;
  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  constructor( private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone ) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id:'400711450268-r0645fd1cdkj96nghjq11dn0avvvqq4a.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe(resp=>{
          // console.log({login: resp})
          this.ngZone.run( () =>{
            this.router.navigateByUrl('/');
          })
        });
  }

  login(){
    this.usuarioService.login( this.loginForm.value )
                .subscribe( resp=> {

                  if(this.loginForm.get('remember')?.value){
                    localStorage.setItem('email', this.loginForm.get('email')?.value);
                  }else{
                    localStorage.removeItem('email');
                  }

                  //Navegar al dashboard
                  this.router.navigateByUrl('/');

                }, (err) =>{
                  Swal.fire('Error', err.error.msg, 'error');
                }
                )

    // console.log(this.loginForm.value);
    this.formSumitted = true;
    
    // console.log(this.loginForm.value);
    
    if(this.loginForm.invalid){
      return;
    }
  }

  campoNoValido( campo: string ):boolean{
    if(this.loginForm.get(campo)?.invalid && this.formSumitted ){
      return true;
    }else{
      return false;
    } 
  }

}
