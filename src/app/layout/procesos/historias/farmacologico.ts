import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";

export class Farmacologico {
    idFarmacologico: string;

    medicamento: string;
    dosis: string;       
    
	eficacia: Opcion;    
	esAdverso: Opcion;
    tiempoDeUso: TiempoUso;
    
    historia: Historia;
}