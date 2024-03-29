﻿import { Admision } from "../admisiones/admision";
import { Opcion } from "../../listas/opciones";
import { Patologico } from "./patologico";
import { Antecedente } from "./Antecedente";
import { Farmacologico } from "./Farmacologico";
import { Traumatico } from "./traumatico";
import { Toxico } from "./toxico";
import { Cie10 } from "../../listas/cie10s";
import { GinecoObstetricio } from "./ginecoObstetricio";
import { User } from "../../seguridad/usuarios/user";
import { ExamenFisico } from "./ExamenFisico";
import { ExamenFisico2 } from "./ExamenFisico2";
import { ExamenFisico3 } from "./ExamenFisico3";
import { ExamenFisico4 } from "./ExamenFisico4";
import { ExamenFisico5 } from "./ExamenFisico5";
import { ExamenFisico6 } from "./ExamenFisico6";

export class Historia {   
    idHistoria: string; 

    motivoConsulta: string;
	enfermedadActual: string;
	
    analisisManejo: string;
    
    podromosPersonalPremorbida: string;

    antecendentesFamiliaresPsiquiatricos: string;
    antecendentesFamiliaresNoPsiquiatricos: string;

    idImpresionDiagnostica: String;
    idImpresionDiagnostica2: String;
    idImpresionDiagnostica3: String;

    medico: User;
    autoriza: User;

    fechaDeInicio: Date;
    admision: Admision;

    patologicos: Patologico[];
    antecedentes: Antecedente[];
    farmacologicos: Farmacologico[];
    traumaticos: Traumatico[];
    toxicos: Toxico[];
    ginecoObstetricios: GinecoObstetricio[];
    
    examenFisicos: ExamenFisico[];
    examenFisicos2: ExamenFisico2[];
    examenFisicos3: ExamenFisico3[];
    examenFisicos4: ExamenFisico4[];
    examenFisicos5: ExamenFisico5[];
    examenFisicos6: ExamenFisico6[];
}