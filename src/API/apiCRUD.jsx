import axios from "axios";
import { busesPosURL } from "./apiurls";

const token = localStorage.getItem("token");

export function agregarElemento(url, requestData, closeModal, ListarDatos) {
  axios
    .post(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
       // Agregar el token en el encabezado de la solicitud
      },
    })
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
    .put(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
       // Agregar el token en el encabezado de la solicitud
      },
    })
    .then(() => {
      closeModal();
      ListarDatos();
    })
    .catch((error) => {
      console.log(error);
    });
};

export function habilitarElemento(url, id, est, ListarDatos) {
  const nurl = `${url}/${id}`;

  axios
    .get(nurl, {
      headers: {
        Authorization: `Bearer ${token}`,
       // Agregar el token en el encabezado de la solicitud
      },
    })
    .then((response) => {
      const elemento = response.data;
      elemento[est] = true;
      axios
        .put(nurl, elemento, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
          },
        })
        .then(() => {
          ListarDatos();
        });
    });
};

export function deshabilitarElemento(url, id, est, ListarDatos) {
  const nurl = `${url}/${id}`;
  axios
    .get(nurl, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
      },
    })
    .then((response) => {
      const elemento = response.data;
      elemento[est] = false;
      axios
        .put(nurl, elemento, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
          },
        })
        .then(() => {
          ListarDatos();
        });
    });
}
