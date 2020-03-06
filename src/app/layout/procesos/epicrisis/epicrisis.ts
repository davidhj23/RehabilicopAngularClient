import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { TratamientoFarmacologico } from "./TratamientoFarmacologico";

export class Epicrisis {   
    idEpicrisis: string; 

    fechaDeCreacion: Date;    
    
    tratamientoFarmacologico: TratamientoFarmacologico[];

    fechaDeIngreso: Date;
    horaIngreso: String;
    ampmIngreso: String;

    fechaDeContinuacion: Date;
    
    fechaDeEgreso: Date;
    horaEgreso: String;
    ampmEgreso: String;

    diasDeEstancia: string;	
	
	justificacion: string;
	plan: string;
    
    usuario: User;
    historia: Historia;    
}