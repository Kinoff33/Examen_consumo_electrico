export class DispositivoInstalado {
    identificador;
    nombre;
    categoria;
    consumoWattsHora;
    ubicacion;
    horasDeUsoDiario;
    constructor(identificador, nombre, categoria, consumoWattsHora, ubicacion, horasDeUsoDiario) {
        this.identificador = identificador;
        this.nombre = nombre;
        this.categoria = categoria;
        this.consumoWattsHora = consumoWattsHora;
        this.ubicacion = ubicacion;
        this.horasDeUsoDiario = horasDeUsoDiario;
    }
    calcularConsumoTotalDiario() {
        return this.consumoWattsHora * this.horasDeUsoDiario;
    }
}
export class RegistroConsumoDiario {
    usuario;
    dispositivo;
    fecha;
    constructor(usuario, dispositivo, fecha) {
        this.usuario = usuario;
        this.dispositivo = dispositivo;
        this.fecha = fecha;
    }
    calcularConsumoTotal() {
        return this.dispositivo.calcularConsumoTotalDiario();
    }
}
export class MonitoreoConsumoDiario {
    registros = [];
    agregarRegistro(registro) {
        this.registros.push(registro);
        console.log(`Se agregó el registro de consumo para ${registro.dispositivo.nombre} al registro del día ${registro.fecha.toLocaleDateString()}.`);
    }
    eliminarRegistroPorFecha(fecha) {
        const registroAEliminar = this.registros.find(r => r.fecha.toDateString() === fecha.toDateString());
        if (registroAEliminar) {
            this.registros = this.registros.filter(r => r.fecha.toDateString() !== fecha.toDateString());
            console.log(`Se eliminó el registro de consumo para ${registroAEliminar.dispositivo.nombre} al registro del día ${fecha.toLocaleDateString()}.`);
        }
        else {
            console.log(`No se encontró un registro para la fecha ${fecha.toLocaleDateString()}.`);
        }
    }
    obtenerTotalConsumoPorDia(fecha) {
        const registrosDelDia = this.registros.filter(r => r.fecha.toDateString() === fecha.toDateString());
        const total = registrosDelDia.reduce((sum, current) => sum + current.calcularConsumoTotal(), 0);
        return total;
    }
    obtenerTotalConsumoPorCategoria(categoria) {
        const total = this.registros.reduce((sum, current) => {
            if (current.dispositivo.categoria === categoria) {
                return sum + current.calcularConsumoTotal();
            }
            return sum;
        }, 0);
        return total;
    }
    obtenerRegistrosPorDia(fecha) {
        return this.registros.filter(r => r.fecha.toDateString() === fecha.toDateString());
    }
}
