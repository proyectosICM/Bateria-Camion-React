// URL base común
const baseURL = "http://localhost:8080/api";
//const baseURL = "http://181.224.251.187:8081/api";
//const baseURL = "http://192.168.0.214:8081/api";

// Rutas específicas
 
//camiones
export const camionURL = `${baseURL}/camion`;

export const bateria1URL = `${baseURL}/detalles/bxc`;
export const bateria2URL = `${baseURL}/detalles/bxc`;
export const bateria3URL = `${baseURL}/detalles/bxc`;
export const bateria4URL = `${baseURL}/detalles/bxc`;

export const busesTURL = `${baseURL}/buses/busxempT`;
export const busesHURL = `${baseURL}/buses/busxempH/1`;
export const busesDURL = `${baseURL}/buses/busxempH/0`;
export const busesListado = `${baseURL}/buses/vista`;
