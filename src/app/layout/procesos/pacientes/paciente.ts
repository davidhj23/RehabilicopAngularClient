
import { TipoDocumento } from "../../listas/tipos-documentos/tipoDocumento";
import { Rol } from "../../seguridad/roles";

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
    roles: Rol[];
    tipoDocumento: TipoDocumento;
}