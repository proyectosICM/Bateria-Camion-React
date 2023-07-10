import React, { useEffect, useState } from 'react';
import { useListarElementos } from '../../../API/apiCRUD';
import { ArranqueEmpresaxCamionURL, ArranquexCamionURL } from '../../../API/apiurls';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useBack } from '../../../Hooks/useBack';
import { useNotAuthorized, useNotAuthorizedInc } from '../../../Hooks/useNotAuthorized';

export function ContenedorArranque() {
  const { id_cam } = useParams();
  const token = localStorage.getItem('token');
  const empresa = localStorage.getItem('empresa');
  const rol = localStorage.getItem('rol');

  const [arranques, setArranques] = useState([]);

  const ListarArranques = useListarElementos(
    `${ArranquexCamionURL}${id_cam}`,
    setArranques
  );

  useEffect(() => {
    ListarArranques();
  }, [ListarArranques]);

  const handleBack = useBack({ rutac: '/detalles', rutaop: `/menuCamion/${empresa}` });
  const navigate = useNavigate();

 useEffect(() => {
    if (arranques.length > 0) {
      let param;
      if (rol === 'CONDUCTOR' ) {
        
      } else if (rol === 'SUPERVISOR' && empresa != arranques[0].empresasModel.id_emp) {
        navigate('/notAuthorized');
      } else if (rol === 'ADMINISTRADOR' && empresa != arranques[0].empresasModel.id_emp) {
        navigate('/notAuthorized');
      }
    }
    //console.log(arranques);
  });


  return (
    <div className="camionesMenu-contenedor">
      <div className="orden">
        <Button onClick={handleBack}>Atras</Button>
        <h1>Arranques totales: {arranques.length}</h1>
      </div>
    </div>
  );
}
