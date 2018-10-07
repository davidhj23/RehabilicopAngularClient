import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Apariencia } from "../../listas/apariencias";

export class ExamenFisico2 {
    idExamenFisico2: string;
    
	frotePericardial: Opcion;    	
	ruidosNoAuscultables: Opcion;    
	arritmico: Opcion;    
	soplo: Opcion;    
	rsCsRsSinSoplo: Opcion;    
    
	hepatomegalia: Opcion;    
	esplenomegalia: Opcion;    
	masaPalpable: Opcion;    
	signosDeIrritacionPeritoneal: Opcion;    
    sinAlteracionesEvidentes: Opcion;        
    iieoParalitico: Opcion;    
	ascitis: Opcion;    
    
    historia: Historia;
}