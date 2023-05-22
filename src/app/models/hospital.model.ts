import { environment } from "../../environments/environment";


const baseUrl=environment.base_url;
interface _HospitalUser{
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser,
    ){}

    get imagenUrl(){
        // console.log(this.img);

        if(!this.img){
            return `${baseUrl}/upload/hospitales/no-image`;
        } else if( this.img?.includes('https') ){
            return this.img;
        } else if(this.img){
            return `${baseUrl}/upload/hospitales/${this.img}`;
        }else{
            return `${baseUrl}/upload/hospitales/no-image`;
        }

    }

}