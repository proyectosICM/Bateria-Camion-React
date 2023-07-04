import { BsBatteryCharging, BsBuildingsFill } from "react-icons/bs";
import { BsFillBusFrontFill } from "react-icons/bs";
import { BsPersonVcard } from "react-icons/bs";
import { FaMapSigns, FaTruckMoving } from "react-icons/fa";
import { TbBusStop } from "react-icons/tb";
import { SiGooglemaps } from "react-icons/si";
import { AiOutlineUserSwitch } from "react-icons/ai";

export const menuCRUDDataAS = {
  tablas: ["Empresas", "Camiones", "Trabajadores", "Baterias"],
  iconos: [BsBuildingsFill, FaTruckMoving, BsPersonVcard, BsBatteryCharging],
  rutas: [
    "/empresasCRUD",
    "/camionesCRUD",
    "/trabajadoresCRUD",
    "/bateriasCRUD",
  ],
};

export const menuCRUDDataAdmin = {
  tablas: ["Camiones", "Trabajadores", "Baterias"],
  iconos: [FaTruckMoving, BsPersonVcard, BsBatteryCharging],
  rutas: [
    "/camionesCRUD",
    "/trabajadoresCRUD",
    "/bateriasCRUD",
  ],
};
