import { Admision } from "../admisiones/admision";
import { Opcion } from "../../listas/opciones";
import { Patologico } from "./patologico";
import { Antecedente } from "./Antecedente";
import { Farmacologico } from "./Farmacologico";
import { Traumatico } from "./traumatico";

export class Historia {   
    idHistoria: string; 

    motivoConsulta: string;
	enfermedadActual: string;
	
	analisisYManejo: string;

    fechaDeInicio: Date;
    admision: Admision;

    patologicos: Patologico[];
    antecedentes: Antecedente[];
    farmacologicos: Farmacologico[];
    traumaticos: Traumatico[];
}