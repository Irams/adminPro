import { Hospital } from "./hospital.model";
import { environment } from "../../environments/environment";

const baseUrl=environment.base_url;

interface _MedicoUser{
    _id: string;
    nombre: string;
    img: string;
}

export class Medico {

    constructor(
        public nombre: string,
        public _id?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital,
        public img?: string,
    ){}

    get imagenUrl(){
        // console.log(this.img);

        if(!this.img){
            return `${baseUrl}/upload/medicos/no-image`;
        } else if( this.img?.includes('https') ){
            return this.img;
        } else if(this.img){
            return `${baseUrl}/upload/medicos/${this.img}`;
        }else{
            return `${baseUrl}/upload/medicos/no-image`;
        }

    }

}