import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useNotAuthorized(param) {
  const empresa = localStorage.getItem("empresa");
  const rol = localStorage.getItem("rol");

  const navigate = useNavigate();

  useEffect(() => {
    if (empresa != param && rol != "SISTEMAS") {
      navigate("/notAuthorized");
    }
  }, []);
}

export function useNotAuthorizedInc(param) {
  const camion = localStorage.getItem("camionid");
  const rol = localStorage.getItem("rol");
  const empresa = localStorage.getItem("empresa");
  const navigate = useNavigate();
  //console.log(rol);
  
  useEffect(() => {
    if ((rol == "CONDUCTOR" && param && param != camion)) {
      navigate("/notAuthorized");
    } else if(rol == "SUPERVISOR" && param && param != empresa ){
        navigate("/notAuthorized");
    } else if(rol == "ADMINISTRADOR" && param && param != empresa ){
      navigate("/notAuthorized");
  } 
  console.log("entro");
  console.log(param);
  console.log(empresa);
  }, [param, navigate, rol]);
}
