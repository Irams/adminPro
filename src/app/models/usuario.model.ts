import { environment } from "src/environments/environment";

const baseUrl=environment.base_url;


export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public rol?: 'ADMIN_ROL' | 'USER_ROLE',
        public uid?: string,
        
    ) {}

    // imprimirUsuario(){ console.log(this.nombre) }

    get imagenUrl(){
        // console.log(this.img);

        if(!this.img){
            return `${baseUrl}/upload/usuarios/no-image`;
        } else if( this.img?.includes('https') ){
            return this.img;
        } else if(this.img){
            return `${baseUrl}/upload/usuarios/${this.img}`;
        }else{
            return `${baseUrl}/upload/usuarios/no-image`;
        }

    }
}