import { Opcion } from "../../listas/opciones";
import { TiempoUso } from "../../listas/tiempos-usos";
import { Historia } from "./historia";

export class Toxico {
    idToxico: string;

    sustancia: string;
    cantidad: string;       
    frecuencia: string;       
    edadInicio: string;       
    
    historia: Historia;
}