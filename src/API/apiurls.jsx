// URL base común
const baseURL = "http://localhost:8080/api";
//const baseURL = "http://181.224.251.187:8081/api";
//const baseURL = "http://192.168.0.214:8081/api";

// Rutas específicas
 
//Baterias 
export const bateriaxcamionURL = `${baseURL}/baterias/camiones`;

//Baterias Detalle
export const bateria1URL = `${baseURL}/detalles/bxc`;
export const bateria2URL = `${baseURL}/detalles/bxc`;
export const bateria3URL = `${baseURL}/detalles/bxc`;
export const bateria4URL = `${baseURL}/detalles/bxc`;
export const bateriaTURL = `${baseURL}/detalles/bxcT`;
export const regisbat = `${baseURL}/detalles/d`;

//camiones
export const camionURL = `${baseURL}/camiones`;
export const camionesTURL = `${baseURL}/buses/busxempT`;
export const camionesHURL = `${baseURL}/buses/busxempH/1`;
export const camionesDURL = `${baseURL}/buses/busxempH/0`;
export const busesListado = `${baseURL}/buses/vista`;


//Empresas
export const empresasURL = `${baseURL}/empresas`;
export const empresasHURL = `${baseURL}/empresas/empresasH/1`;
export const empresasDURL = `${baseURL}/empresas/empresasH/0`;

//Distritos
export const trabajadorURL = `${baseURL}/trabajadores`;
export const trabajadorTURL = `${baseURL}/trabajadores/trabajadoresxEmpT`;
export const trabajadorHURL = `${baseURL}/trabajadores/trabajadoresxEmpH/1`;
export const trabajadorDURL = `${baseURL}/trabajadores/trabajadoresxEmpH/0`;

//Incidencias
export const IncidenciasURL = `${baseURL}/incidencias`;
export const IncidenciasxEmpresa = `${baseURL}/incidencias/empresa/`;
export const IncidenciasxEmpresaE = `${baseURL}/incidencias/empSR/`;