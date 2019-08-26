
import { TipoDocumento } from "../../listas/tipos-documentos/tipoDocumento";
import { Rol } from "../../seguridad/roles";
import { EstadoCivil } from "../../listas/estados-civiles";
import { Aseguradora } from "../../listas/aseguradoras";
import { TipoEntidad } from "../../listas/tipos-entidades";
import { Sede } from "../../listas/sedes";
import { Atencion } from "../../listas/atenciones";
import { Cama } from "../../listas/camas";
import { User } from "../../seguridad/usuarios/user";
import { Parentesco } from "../../listas/parentescos";
import { Cie10 } from "../../listas/cie10s";
import { Paciente } from "../pacientes/paciente";

export class Admision {   
    idAdmision: string; 
    paciente: Paciente;
    fechaDeIngreso: Date;
    fechaDeRemision: Date;    
    aseguradora: Aseguradora;
    tipoEntidad: TipoEntidad;
    sede: Sede;
    atencion: Atencion;
    cama: Cama;
    idMedico: string;
    idEnfermero: string;
    parentesco: Parentesco;
    numeroRemision: string;
    acompanante: string;
    direccionAcompanante: string;
    telefonoAcompanante: string;
    ciudadAcompanante: string;
    idDiagnosticoPrincipal: string;
    idDiagnosticoSecundario: string;
    idAdmisionista: string;
    estado: string;
    fechaDeCierre: Date;
}