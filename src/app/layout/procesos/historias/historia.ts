import { Admision } from "../admisiones/admision";
import { Opcion } from "../../listas/opciones";

export class Historia {   
    idHistoria: string; 

    motivoConsulta: string;
    enfermedadActual: string;

    patologicoPsiquiatrico1: string;
	patologicoPsiquiatrico2: string;
	patologicoPsiquiatrico3: string;
	estadoPatologicoPsiquiatrico1: string;
	estadoPatologicoPsiquiatrico2: string;
	estadoPatologicoPsiquiatrico3: string;
	tiempoEvolucionPatologicoPsiquiatrico1: string;
	tiempoEvolucionPatologicoPsiquiatrico2: string;
	tiempoEvolucionPatologicoPsiquiatrico3: string;

	patologicoNoPsiquiatrico1: string;
	patologicoNoPsiquiatrico2: string;
	patologicoNoPsiquiatrico3: string;
	estadoPatologicoNoPsiquiatrico1: string;
	estadoPatologicoNoPsiquiatrico2: string;
	estadoPatologicoNoPsiquiatrico3: string;
	tiempoEvolucionPatologicoNoPsiquiatrico1: string;
	tiempoEvolucionPatologicoNoPsiquiatrico2: string;
	tiempoEvolucionPatologicoNoPsiquiatrico3: string;

	numeroPsiquiatrica: string;
	institucionPsiquiatrica: string;
	fechaUltimaHospitalizacionPsiquiatrica: Date;
	esLaPrimeraHospitalizacionPsiquiatrica: Opcion;

	numeroNoPsiquiatrica: string;
	institucionNoPsiquiatrica: string;
	fechaUltimaHospitalizacionNoPsiquiatrica: Date;	

	analisisYManejo: string;

    fechaDeInicio: Date;
    admision: Admision;
}