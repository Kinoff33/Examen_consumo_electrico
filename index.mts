import { Usuario } from './interfaces.mts';
import { DispositivoInstalado, RegistroConsumoDiario, MonitoreoConsumoDiario } from './clases';

const usuario1: Usuario = {
  nombre: 'Juan Pérez',
  direccion: {
    calle: 'Avenida Siempre Viva',
    ciudad: 'Springfield',
    codigoPostal: '12345'
  }
};

const televisor = new DispositivoInstalado('TV-001', 'Televisor', 'Entretenimiento', 100, 'Sala', 4);
const nevera = new DispositivoInstalado('NEV-002', 'Refrigerador', 'Electrodoméstico', 150, 'Cocina', 24);
const lavadora = new DispositivoInstalado('LAV-003', 'Lavadora', 'Electrodoméstico', 2000, 'Lavandería', 1);


const monitor = new MonitoreoConsumoDiario();


const hoy = new Date();
const ayer = new Date();
ayer.setDate(hoy.getDate() - 1);


const registro1 = new RegistroConsumoDiario(usuario1, televisor, hoy);
const registro2 = new RegistroConsumoDiario(usuario1, nevera, hoy);
const registro3 = new RegistroConsumoDiario(usuario1, lavadora, ayer);

monitor.agregarRegistro(registro1);
monitor.agregarRegistro(registro2);
monitor.agregarRegistro(registro3);


console.log('\n--- Demostración de Funcionalidades ---\n');


const totalConsumoHoy = monitor.obtenerTotalConsumoPorDia(hoy);
console.log(`Total de Watts Hora consumidos en el día ${hoy.toLocaleDateString()}: ${totalConsumoHoy} Wh`);


console.log(`\nConsumos del día ${hoy.toLocaleDateString()}:`);
const registrosHoy = monitor.obtenerRegistrosPorDia(hoy);
registrosHoy.forEach((registro, index) => {
  console.log(`${index + 1}. ${registro.dispositivo.nombre} - ${registro.calcularConsumoTotal()} Wh`);
});


const consumoElectrodomesticos = monitor.obtenerTotalConsumoPorCategoria('Electrodoméstico');
console.log(`\nConsumo total de la categoría 'Electrodoméstico': ${consumoElectrodomesticos} Wh`);


monitor.eliminarRegistroPorFecha(ayer);