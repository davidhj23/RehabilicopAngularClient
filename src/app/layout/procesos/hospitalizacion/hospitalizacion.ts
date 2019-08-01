import { Historia } from "../historias/historia";
import { User } from "../../seguridad/usuarios/user";
import { Cie10 } from "../../listas/cie10s";
import { ViaIngreso } from "../../listas/vias-ingresos";
import { Opcion } from "../../listas/opciones";

export class Hospitalizacion {   
    idHospitalizacion: string; 

    viaIngreso: ViaIngreso;    
    fechaIngreso: Date;
    horaIngreso: String;
    ampmIngreso: String;

    fechaSalida: Date;
    horaSalida: String;
    ampmSalida: String; 
    
    diasEstancia: String;
    acudiente: String; 
    
    embarazada: Opcion;
    semanas: String;
    accidenteDeTrabajo: Opcion;
    accidenteDeTransito: Opcion;
    otroTipoDeAccidente: Opcion;

    eventoCatastrofico: Opcion;
    lesionPorAgresion: Opcion;
    lesionAutoInfligida: Opcion;

    maltrato: Opcion;
    enfermedadGeneral: Opcion;
    enfermedadProfesional: Opcion;

    diagnosticoDeIngreso: Cie10;
    diagnosticoDeEgreso: Cie10;
    complicacion: Cie10;
    causaDeLaMuerte: Cie10;
    enfermedadSobregenerada: Cie10;
        
    usuario: User;    
    historia: Historia;    
}