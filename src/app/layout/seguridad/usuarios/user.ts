import { Rol } from "../roles";
import { TipoDocumento } from "../../listas/tipo-documentos/tipoDocumento";

export class User {
    idUsuario: number;
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