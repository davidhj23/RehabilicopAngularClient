import { Historia } from "./historia";
import { Estado } from "../../listas/estados";

export class Patologico {   
    idPatologico: string;

    descripcion: string;	
	tiempoEvolucion: string;		
	tipo: string;			
	
	estado: Estado;

    historia: Historia; 
}