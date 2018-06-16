import { Rol } from "../roles";
import { TipoDocumento } from "../../listas/tipos-documentos/tipoDocumento";

export class User {
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
    tipoDocumento: TipoDocumento[];
}