import { Medicamento } from "../../listas/medicamentos";
import { Dosis } from "../../listas/dosis";
import { Epicrisis } from "./epicrisis";


export class TratamientoFarmacologico {   
    idTratamientoFarmacologico: string; 
    
    medicamento: Medicamento;
    dosis: Dosis;

    desde: Date;
	hasta: Date;
	
    epicrisis: Epicrisis;    
}