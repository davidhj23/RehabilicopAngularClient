
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

export class Paciente {
    idUsuario: string;
    username: string;
    password: string;
    email: string;
    enabled: boolean;
    identificacion: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    celular: string;
    ultimoAcceso: Date;
    imagenUrl: string;
    fechaDeNacimiento: Date;
    fechaDeIngreso: Date;
    fechaDeRemision: Date;
    roles: Rol[];
    tipoDocumento: TipoDocumento;
    estadoCivil: EstadoCivil;
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
    diagnosticoPrincipal: Cie10;
    diagnosticoSecundario: Cie10;
}