import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!:Usuario;
  public imagenASubir!: File;
  public imgTemp!: any;
  
  constructor( public fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUpload: FileUploadService ) { 
    this.usuario = usuarioService.usuario;
  }
  
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email] ],
      // oldPassword: ['', Validators.required],
      // newPassword: ['', Validators.required]
    });
  }

  actualizarPerfil(){
    // console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe( resp => {
      // console.log(resp);  
      const { nombre, email, oldPassword, newPassword } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;
      Swal.fire( 'Guardado', 'Usuario actualizado!', 'success');
    }, (err) => {
      Swal.fire( 'Error', err.error.msg, 'error');
    });
  }

  cambiarImagen(file: File){
    // console.log(file);
    this.imagenASubir = file;
    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () =>{
      this.imgTemp = reader.result?.toString();
      // console.log(reader.result);
      
    }
  }

  subirImagen(){
    this.fileUpload
    .actualizarFoto(this.imagenASubir, 'usuarios', this.usuario.uid!)
    .then(img => {
      this.usuario.img = img
      Swal.fire( 'Guardado', 'Imagen actualizada!', 'success');
    }).catch( err => {
      console.log(err);
      Swal.fire( 'Error', 'No se pudo subir la imagen', 'error');
    });
  }

}
