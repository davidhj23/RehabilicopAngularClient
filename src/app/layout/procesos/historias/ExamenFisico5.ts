import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Apariencia } from "../../listas/apariencias";
import { EstadosConcienciasComponent, EstadoConciencia } from "../../listas/estados-conciencias";

export class ExamenFisico5 {
    idExamenFisico5: string;
	
	estadoConciencia: EstadoConciencia;    	

	fecha: Date;    	

	persona: Opcion;    
	espacio: Opcion;    
	tiempo: Opcion;       
    
	euprosexico: Opcion;    
	hipoprosexico: Opcion;    

	eutimico: Opcion;    
	depresivo: Opcion;    
    expensivo: Opcion;        
	hiperprosexico: Opcion;   
	
	descripcion: string;

	orgienNormal: Opcion;    
	acustica: Opcion;    
    concreto: Opcion;        
	pobrezaIdeativa: Opcion;   

	cursoNormal: Opcion;    
	bridipsiquia: Opcion;    
    taquipsiquia: Opcion;        
	fugasDeIdea: Opcion;   

	ideasDelirantes: Opcion;    
	ideasRefenciales: Opcion;    
    ideasObsesivas: Opcion;        
	pensamientoMago: Opcion;   
    
    historia: Historia;
}