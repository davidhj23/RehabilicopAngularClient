import { Historia } from "./historia";
import { Opcion } from "../../listas/opciones";

export class Traumatico{
    idTraumatico: string;

    trauma: string;
	tiempoEvolucion: string;	
    secuelas: string;
    
	compromisoConciencia: Opcion;
    
    historia: Historia;
}