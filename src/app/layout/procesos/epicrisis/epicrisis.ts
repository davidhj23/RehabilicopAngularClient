import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { TratamientoFarmacologico } from "./TratamientoFarmacologico";

export class Epicrisis {   
    idEpicrisis: string; 

    fechaDeCreacion: Date;    
    
    tratamientoFarmacologico: TratamientoFarmacologico[];

    fechaDeIngreso: Date;
	fechaDeContinuacion: Date;
    fechaDeEgreso: Date;
    diasDeEstancia: string;	
	
	justificacion: string;
	plan: string;
    
    usuario: User;
    historia: Historia;    
}