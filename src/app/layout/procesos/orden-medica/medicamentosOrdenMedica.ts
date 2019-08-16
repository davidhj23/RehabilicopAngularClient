import { OrdenMedica } from "./ordenMedica";
import { Medicamento } from "../../listas/medicamentos";
import { Dosis } from "../../listas/dosis";
import { Administracion } from "./administracion";

export class MedicamentosOrdenMedica {   
    idMedicamentosOrdenMedica: string; 

    fecha: Date;

    medicamento: Medicamento;           

    cantidadSolicitada: String;
    cantidadEntregada: String;
    
    ordenMedica: OrdenMedica;    

    administraciones: Administracion[];
}