import {User, Permiso} from './index';

export class Rol {
    idRol: number;
    nombre: string;
    usuarios: User[];
    permisos: Permiso[];
}