import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { MedicamentosOrdenMedica } from "./medicamentosOrdenMedica";

export class OrdenMedica {   
    idOrdenMedica: string; 

    fechaDeCreacion: Date;
    estado: String;
    puedeCerrar: boolean;
    
    medicamentosOrdenMedica: MedicamentosOrdenMedica[];

    solicitante: User;
    quienEntrega: User;
    quienRecibe: User;

    historia: Historia;    
}