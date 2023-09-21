import React, { useContext, useEffect, useState } from "react";
import { NavBarConductor } from "../VistaConductor/navbarConductor";
import { NavBarSupervisor } from "../VistaSupervisor/navbarSupervisor";
import { NavBarAdministrador } from "../VistaAdministrador/navbarAdministrador";
import { UserContext } from "../Hooks/userProvider";
import { NavBarASistemas } from "../VistaASistemas/navbarASistemas";


export function NavBarSelect() {
  const { userRole } = useContext(UserContext);
  const [nav, setNav] = useState(null);
 
  useEffect(() => {
    if (userRole === "CONDUCTOR") {
      setNav(<NavBarConductor />);
    } else if (userRole === "SUPERVISOR") {
      setNav(<NavBarSupervisor />);
    } else if (userRole === "ADMINISTRADOR") {
      setNav(<NavBarAdministrador />);
    } else if (userRole === "SISTEMAS") {
      setNav(<NavBarASistemas />)
    }
  }, [userRole]);

  return <>{nav}</>;
}
