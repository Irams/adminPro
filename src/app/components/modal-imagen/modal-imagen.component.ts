import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { CargarUsuario } from '../../interfaces/cargar-usuarios.interface';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenASubir!: File;
  public imgTemp!: any;

  constructor( public modalImagenService: ModalImagenService,
               public fileUpload: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUpload
    .actualizarFoto(this.imagenASubir, tipo, id )
    .then(img => {
      Swal.fire( 'Guardado', 'Imagen actualizada!', 'success');
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( err => {
      console.log(err);
      Swal.fire( 'Error', 'No se pudo subir la imagen', 'error');
    });
    
  }


}
