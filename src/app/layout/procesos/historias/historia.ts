import { Admision } from "../admisiones/admision";
import { Opcion } from "../../listas/opciones";

export class Historia {   
    idHistoria: string; 

    motivoConsulta: string;
    enfermedadActual: string;

    patologicoPsiquiatrico1: string;
	patologicoPsiquiatrico2: string;
	patologicoPsiquiatrico3: string;
	idEstadoPatologicoPsiquiatrico1: string;
	idEstadoPatologicoPsiquiatrico2: string;
	idEstadoPatologicoPsiquiatrico3: string;
	tiempoEvolucionPatologicoPsiquiatrico1: string;
	tiempoEvolucionPatologicoPsiquiatrico2: string;
	tiempoEvolucionPatologicoPsiquiatrico3: string;

	patologicoNoPsiquiatrico1: string;
	patologicoNoPsiquiatrico2: string;
	patologicoNoPsiquiatrico3: string;
	idEstadoPatologicoNoPsiquiatrico1: string;
	idEstadoPatologicoNoPsiquiatrico2: string;
	idEstadoPatologicoNoPsiquiatrico3: string;
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

	tipoReaccion: string;
	sustancias: string;

	trauma1: string;
	tiempoEvolución1: string;
	idCompromisoConciencia1: string;
	secuelas1: string;

	trauma2: string;
	tiempoEvolución2: string;
	idCompromisoConciencia2: string;
	secuelas2: string;

	trauma3: string;
	tiempoEvolución3: string;
	idCompromisoConciencia3: string;
	secuelas3: string;

	trauma4: string;
	tiempoEvolución4: string;
	idCompromisoConciencia4: string;
	secuelas4: string;

	medicamentos1: string;
    dosis1: string;
    idTiempoDeUso1: string;
    idEficacia1: string;
	idEAdverso1: string;
	
	medicamentos2: string;
    dosis2: string;
    idTiempoDeUso2: string;
    idEficacia2: string;
	idEAdverso2: string;
	
	medicamentos3: string;
    dosis3: string;
    idTiempoDeUso3: string;
    idEficacia3: string;
	idEAdverso3: string;
	
	medicamentos4: string;
    dosis4: string;
    idTiempoDeUso4: string;
    idEficacia4: string;
	idEAdverso4: string;
	
	medicamentos5: string;
    dosis5: string;
    idTiempoDeUso5: string;
    idEficacia5: string;
    idEAdverso5: string;

	analisisYManejo: string;

    fechaDeInicio: Date;
    admision: Admision;
}