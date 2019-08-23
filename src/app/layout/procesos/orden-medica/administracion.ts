import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { MedicamentosOrdenMedica } from "./medicamentosOrdenMedica";
import { Dosis } from "../../listas/dosis";

export class Administracion {   
    idAdministracion: string; 

    fecha: String;
    hora: String;
    ampm: String;
    valida: String;
    administra: User;

    medicamentosOrdenMedica: MedicamentosOrdenMedica;
}