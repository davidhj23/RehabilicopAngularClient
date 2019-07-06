import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { Medicamento } from "../../listas/medicamentos";
import { Dosis } from "../../listas/dosis";

export class AdministracionDeMedicamentos {   
    idAdministracionDeMedicamentos: string; 

    fecha: Date;
    hora: String;
    ampm: String;

    medicamento: Medicamento;
    frecuencia: Dosis;

    administra: User;
    usuario: User;    

    historia: Historia;    
}