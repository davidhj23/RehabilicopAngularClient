import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { Medicamento } from "../../listas/medicamentos";
import { Dosis } from "../../listas/dosis";
import { Cie10 } from "../../listas/cie10s";

export class CuidadosDeEnfermeria {   
    idCuidadosDeEnfermeria: string; 

    fecha: Date;
    
    hallazgos : String;
    acciones : String;
    evaluacion : String;
    dxEnfermeria: Cie10;

    usuario: User;    
    historia: Historia;    
}