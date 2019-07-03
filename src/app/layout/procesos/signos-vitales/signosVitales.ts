import { User } from "../../seguridad/usuarios/user";
import { Historia } from "../historias/historia";
import { EstadoConciencia } from "../../listas/estados-conciencias";

export class SignosVitales {   
    idSignosVitales: string; 

    fecha: Date;
    hora: String;
    ampm: String;

    tension: String;
	temperatura: String;
    pulso: String;	
    respiracion: String;
    glucometria: String;
    
    estadoConciencia: EstadoConciencia;

    usuario: User;
    historia: Historia;    
}