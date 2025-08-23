import { DispositivoElectrico, Usuario, RegistroConsumo } from './interfaces.mts';
export class DispositivoInstalado implements DispositivoElectrico {
  constructor(
    public identificador: string,
    public nombre: string,
    public categoria: string,
    public consumoWattsHora: number,
    public ubicacion: string,
    public horasDeUsoDiario: number
  ) {}

  
  calcularConsumoTotalDiario(): number {
    return this.consumoWattsHora * this.horasDeUsoDiario;
  }
}


export class RegistroConsumoDiario implements RegistroConsumo {
  constructor(
    public usuario: Usuario,
    public dispositivo: DispositivoInstalado,
    public fecha: Date
  ) {}

 
  calcularConsumoTotal(): number {
    return this.dispositivo.calcularConsumoTotalDiario();
  }
}


export class MonitoreoConsumoDiario {
  private registros: RegistroConsumoDiario[] = [];

  agregarRegistro(registro: RegistroConsumoDiario): void {
    this.registros.push(registro);
    console.log(`Se agregó el registro de consumo para ${registro.dispositivo.nombre} al registro del día ${registro.fecha.toLocaleDateString()}.`);
  }

  eliminarRegistroPorFecha(fecha: Date): void {
    const registroAEliminar = this.registros.find(r => r.fecha.toDateString() === fecha.toDateString());
    if (registroAEliminar) {
      this.registros = this.registros.filter(r => r.fecha.toDateString() !== fecha.toDateString());
      console.log(`Se eliminó el registro de consumo para ${registroAEliminar.dispositivo.nombre} al registro del día ${fecha.toLocaleDateString()}.`);
    } else {
      console.log(`No se encontró un registro para la fecha ${fecha.toLocaleDateString()}.`);
    }
  }

  obtenerTotalConsumoPorDia(fecha: Date): number {
    const registrosDelDia = this.registros.filter(r => r.fecha.toDateString() === fecha.toDateString());
    const total = registrosDelDia.reduce((sum, current) => sum + current.calcularConsumoTotal(), 0);
    return total;
  }

  obtenerTotalConsumoPorCategoria(categoria: string): number {
    const total = this.registros.reduce((sum, current) => {
      if (current.dispositivo.categoria === categoria) {
        return sum + current.calcularConsumoTotal();
      }
      return sum;
    }, 0);
    return total;
  }

  obtenerRegistrosPorDia(fecha: Date): RegistroConsumoDiario[] {
    return this.registros.filter(r => r.fecha.toDateString() === fecha.toDateString());
  }
}