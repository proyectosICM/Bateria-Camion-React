import axios from "axios";
import { busesPosURL } from "./apiurls";

export function agregarElemento(url, requestData, closeModal, ListarDatos) {
  axios
    .post(url, requestData)
    .then(() => {
      closeModal();
      ListarDatos();
    })
    .catch((error) => {
      console.log(error);
    });
} 

export function editarElemento(url, requestData, closeModal, ListarDatos) {
  axios
    .put(url, requestData)
    .then(() => {
      closeModal();
      ListarDatos();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function habilitarElemento(url, id, est, ListarDatos) {
    const nurl = `${url}/${id}`
  axios.get(nurl).then((response) => {
    const elemento = response.data;
    elemento[est] = true;
    axios.put(nurl, elemento).then(() => {
      ListarDatos();
    });
  });
}

export function deshabilitarElemento(url, id, est, ListarDatos) {
    const nurl = `${url}/${id}`
  axios.get(nurl).then((response) => {
    const elemento = response.data;
    elemento[est] = false;
    axios.put(nurl, elemento).then(() => {
      ListarDatos();
    });
  });
}

    
 
