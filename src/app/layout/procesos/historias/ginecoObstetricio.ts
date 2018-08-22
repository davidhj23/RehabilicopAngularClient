import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Gesta } from "../../listas/gestas";

export class GinecoObstetricio {
    idGinecoObstetricio: string;

    partos: string;
	abortos: string;
	semanas: string;
	menarquias: string;
	fum: string;	
	
	embarazoActual: Opcion;	
	gesta: Gesta;	      
    
    historia: Historia;
}