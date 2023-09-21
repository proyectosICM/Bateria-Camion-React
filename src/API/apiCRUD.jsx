import axios from "axios";
import { busesPosURL } from "./apiurls";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoutToken } from "../Hooks/logoutToken";
import { useNavigate } from "react-router-dom";

export function useListarElementos(url) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [fallotoken, setFallotoken] = useState(false);

  const fetchData = useCallback(async (setDatos) => {
    try {
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatos(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        localStorage.removeItem("token", token);
        //navigate("/login");
      } else if (error.response && error.response.status === 401) {
        console.error(`No pasas}`, error);
        //navigate("/login");
      }
    }
  }, [url, token]);

  useEffect(() => {
    //fetchData();
    //console.log("Listado inicial");

    const interval = setInterval(() => {
      //console.log(`Interval ${url}`);
      fetchData();
    }, 5000); // Actualiza cada 5 segundos, ajusta el intervalo según tus necesidades

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  return fetchData;
}

export function useListarElementosEdit(url, setDatos) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    try {
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDatos(results.data);
      //console.log(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        //navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos del camión z  :", error);
      }
    }
  });
 
  return fetchData;
}

export function agregarElemento(url, requestData, closeModal, ListarDatos) {
  const token = localStorage.getItem("token");

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
  const token = localStorage.getItem("token");

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
}

export function editarElementoSM(url, requestData, ListarDatos) {
  const token = localStorage.getItem("token");
  console.log(requestData);
  axios
    .put(url, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Agregar el token en el encabezado de la solicitud
      },
    })
    .then(() => {
      ListarDatos();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function habilitarElementoSL(url, id, est) {
  const nurl = `${url}/${id}`;
  const token = localStorage.getItem("token");

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
      //console.log(elemento);
      axios
        .put(nurl, elemento, {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
          },
        })
        .then(() => {
          //console.log(elemento);
        });
    });
}


export function habilitarElemento(url, id, est ,ListarDatos) {
  const nurl = `${url}/${id}`;
  const token = localStorage.getItem("token");

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
      //console.log(elemento);
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

export function deshabilitarElemento(url, id, est, ListarDatos) {
  const token = localStorage.getItem("token");
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
