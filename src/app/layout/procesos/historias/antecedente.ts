import { Historia } from "./historia";
import { Opcion } from "../../listas/opciones";

export class Antecedente{
    idAntecedente: string;

    numero: string;
	institucion: string;
    fechaUltimaHospitalizacion: Date;			
    tipo: string;
	
	causa: string;

    historia: Historia;
}