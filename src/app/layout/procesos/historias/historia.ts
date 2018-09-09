import { Admision } from "../admisiones/admision";
import { Opcion } from "../../listas/opciones";
import { Patologico } from "./patologico";
import { Antecedente } from "./Antecedente";
import { Farmacologico } from "./Farmacologico";
import { Traumatico } from "./traumatico";
import { Toxico } from "./toxico";
import { Cie10 } from "../../listas/cie10s";
import { GinecoObstetricio } from "./ginecoObstetricio";
import { User } from "../../seguridad/usuarios/user";

export class Historia {   
    idHistoria: string; 

    motivoConsulta: string;
	enfermedadActual: string;
	
    analisisManejo: string;
    
    podromosPersonalPremorbida: string;

    antecedentesFamiliaresPsiquiatricos: string;
    antecedentesFamiliaresNoPsiquiatricos: string;

    impresionDiagnostica: Cie10;

    medico: User;
    autoriza: User;

    fechaDeInicio: Date;
    admision: Admision;

    patologicos: Patologico[];
    antecedentes: Antecedente[];
    farmacologicos: Farmacologico[];
    traumaticos: Traumatico[];
    toxicos: Toxico[];
    ginecoObstetricio: GinecoObstetricio[];
}