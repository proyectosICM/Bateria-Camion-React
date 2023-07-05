import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useNotAuthorized(param){
    const empresa = localStorage.getItem("empresa");
    const rol = localStorage.getItem('rol');
  
    const navigate = useNavigate();
  
    useEffect(() => {
      if (empresa != param && rol != "SISTEMAS") {
        navigate("/notAuthorized");
      }
    }, []);
}