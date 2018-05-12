import { User } from "../../seguridad/usuarios/user";

export class TipoDocumento{
    idTipoDocumento: number;
    nombre: string;
    usuarios: User[];
}