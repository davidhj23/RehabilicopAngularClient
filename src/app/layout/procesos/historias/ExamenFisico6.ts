import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";
import { Apariencia } from "../../listas/apariencias";
import { EstadosConcienciasComponent, EstadoConciencia } from "../../listas/estados-conciencias";
import { Curso } from "../../listas/cursos";
import { Asfixia } from "../../listas/asfixias";
import { Alucinacion } from "../../listas/alucinaciones";
import { Memoria2 } from "../../listas/memoria2";
import { Introspeccion } from "../../listas/introspecciones";
import { Inteligencia } from "../../listas/inteligencias";
import { Alimentacion } from "../../listas/alimentaciones";
import { Comprensible } from "../../listas/comprensibles";

export class ExamenFisico6 {
    idExamenFisico6: string;
	
	comprensible: Comprensible;

	disartrias: Opcion;    
	curso: Curso;    
	asfixias: Asfixia;    
	alucinaciones: Alucinacion;    

	tipo: string;
	
	fijacion: Memoria2;    
    reciente: Memoria2;        
	remota: Memoria2;   

	inteligencia: Inteligencia;    
	introspeccion: Introspeccion;    
	prospeccion: Introspeccion;   
	juicio: Introspeccion;        

	alimentacion: Alimentacion;    
	tipoAlimenticio: string;    

    adecuado: Opcion;        
	hipersomnio: Opcion;   
	insomnio: Opcion;    
	cociliacion: Opcion;    
    reconciliacion: Opcion;        
	global: Opcion;   
    
    historia: Historia;
}