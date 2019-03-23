import { OrdenMedica } from "./ordenMedica";
import { Medicamento } from "../../listas/medicamentos";
import { Dosis } from "../../listas/dosis";

export class MedicamentosOrdenMedica {   
    idMedicamentoOrdenMedica: string; 

    medicamento: Medicamento;    
    dosis: Dosis;    

    cantidadSolicitada: String;
    cantidadEntregada: String;
    
    ordenMedica: OrdenMedica;    
}