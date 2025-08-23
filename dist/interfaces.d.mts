interface Direccion {
    calle: string;
    ciudad: string;
    codigoPostal: string;
}
export interface Usuario {
    nombre: string;
    direccion: Direccion;
}
export interface DispositivoElectrico {
    identificador: string;
    nombre: string;
    categoria: string;
    consumoWattsHora: number;
    ubicacion: string;
    horasDeUsoDiario: number;
    calcularConsumoTotalDiario(): number;
}
export interface RegistroConsumo {
    usuario: Usuario;
    dispositivo: DispositivoElectrico;
    fecha: Date;
    calcularConsumoTotal(): number;
}
export {};
