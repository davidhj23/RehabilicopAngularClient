import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Apariencia } from "../../listas/apariencias";

export class ExamenFisico3 {
    idExamenFisico3: string;
    
	llenadoCapilarAlterado: Opcion;    	
	pulsoAusentes: Opcion;    
	deformidad: Opcion;    
	movilidadAlterada: Opcion;    
	pulsosPerifericosPresentes: Opcion;    
    
	cianosis: Opcion;    
	ictericia: Opcion;    
	palidezMucocutanea: Opcion;    
	hematomasEquimosisHeridas: Opcion;    
    cicatricesTatuajes: Opcion;        
    sinAlteracionesEvidentes: Opcion;   
    
    historia: Historia;
}