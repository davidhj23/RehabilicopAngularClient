import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Apariencia } from "../../listas/apariencias";

export class ExamenFisico {
    idExamenFisico: string;

    apariencia: Apariencia;
    descripcionApariencia: string;
    
    signoVitalTa: string;
	signoVitalFc: string;
	signoVitalFr: string;
	signoVitalT: string;
    
	eficacia: Opcion;    
    
	midriasis: Opcion;    	
	miosis: Opcion;    
	anisocordia: Opcion;    
    pinral: Opcion;    
    
	otorragia: Opcion;    
	otoliquia: Opcion;    
	rinoloquia: Opcion;    
	epixtasis: Opcion;    
    murmulloVesicular: Opcion;    
    
    estertoresCrepitantes: Opcion;    
	roncus: Opcion;    
	sibilancias: Opcion;    
    silencioAuscultorio: Opcion;    
	murmulloVesicularPulmones: Opcion;    
    
    historia: Historia;
}