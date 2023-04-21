import { environment } from "src/environments/environment";

const baseUrl=environment.base_url;

environment

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public rol?: string,
        public uid?: string,
        
    ) {}

    // imprimirUsuario(){ console.log(this.nombre) }

    get imagenUrl(){
        // console.log(this.img);
        
        if( this.img?.includes('https') ){
            return this.img;
        }

        if(this.img){
            return `${baseUrl}/upload/usuarios/${this.img}`;
        }else{
            return `${baseUrl}/upload/usuarios/no-image`;
        }

    }
}