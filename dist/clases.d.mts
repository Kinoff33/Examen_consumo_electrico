import { DispositivoElectrico, Usuario, RegistroConsumo } from './interfaces.mts';
export declare class DispositivoInstalado implements DispositivoElectrico {
    identificador: string;
    nombre: string;
    categoria: string;
    consumoWattsHora: number;
    ubicacion: string;
    horasDeUsoDiario: number;
    constructor(identificador: string, nombre: string, categoria: string, consumoWattsHora: number, ubicacion: string, horasDeUsoDiario: number);
    calcularConsumoTotalDiario(): number;
}
export declare class RegistroConsumoDiario implements RegistroConsumo {
    usuario: Usuario;
    dispositivo: DispositivoInstalado;
    fecha: Date;
    constructor(usuario: Usuario, dispositivo: DispositivoInstalado, fecha: Date);
    calcularConsumoTotal(): number;
}
export declare class MonitoreoConsumoDiario {
    private registros;
    agregarRegistro(registro: RegistroConsumoDiario): void;
    eliminarRegistroPorFecha(fecha: Date): void;
    obtenerTotalConsumoPorDia(fecha: Date): number;
    obtenerTotalConsumoPorCategoria(categoria: string): number;
    obtenerRegistrosPorDia(fecha: Date): RegistroConsumoDiario[];
}
