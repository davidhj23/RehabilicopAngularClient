import { Evoluciones } from "./evoluciones";

export class EvolucionPaciente {   
    idPaciente: string;    
    identificacion: string;
    nombrePaciente: string; 
    evoluciones: Evoluciones[];
    evolucionesNoCumplidas: any[];
    hayEvolucionesNoCumplidas: boolean;
}