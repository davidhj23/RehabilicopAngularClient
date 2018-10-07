import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Apariencia } from "../../listas/apariencias";

export class ExamenFisico4 {
    idExamenFisico4: string;
    
	alerta: Opcion;    	
	somnolencia: Opcion;    
	estupor: Opcion;    
	comas: Opcion;    
	agitacion: Opcion;    
    
	reflejosMuscoloTendinosooAlterados: Opcion;    
	signosmeningeosPresentes: Opcion;    
	perdidaDeLaSensibilidad: Opcion;    
	inconctinenciaUrinariaOFecal: Opcion;    
    movimientosAnormales: Opcion;        
	sinAlteracionesEvidentes: Opcion;   
	
	cabezaYCuello: string;	
	cardioPulmar: string;	
	abdomen: string;
	genitourinario: string;	
	extremidades: string;
	
	descripcion: string;
    
    historia: Historia;
}