import { User } from "../../seguridad/usuarios/user";
import { Historia } from "../historias/historia";
import { EstadoConciencia } from "../../listas/estados-conciencias";

export class NotasDeEnfermeria {   
    idNotasDeEnfermeria: string; 

    fecha: Date;
    hora: String;
    ampm: String;
    descripcion: String;

    medico: User;
    usuario: User;
    historia: Historia;    
}