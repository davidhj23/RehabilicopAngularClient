import { OrdenMedica } from "./ordenMedica";
import { Medicamento } from "../../listas/medicamentos";
import { Dosis } from "../../listas/dosis";
import { Administracion } from "./administracion";

export class MedicamentosOrdenMedica {   
    idMedicamentosOrdenMedica: string; 

    medicamento: Medicamento;  
    frecuencia: Dosis;
    cantidadSolicitada: String;
    cantidadEntregada: String;
    
    ordenMedica: OrdenMedica;    
    administraciones: Administracion[];
}