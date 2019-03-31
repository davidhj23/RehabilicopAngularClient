﻿import { User } from "../../seguridad/usuarios/user";
import { TipoEvolucion } from "../../configuracion/evoluciones/tipoEvolucion";
import { Historia } from "../historias/historia";

export class HojaEventual {   
    idHojaEventual: string; 

    fecha: Date;
    descripcion: String;

    tipoEvolucion: TipoEvolucion;
    historia: Historia;
    usuario: User;
}