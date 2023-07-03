import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function PruebaDeVista() {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const handleLogout = () => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`Clave: ${key}, Valor: ${value}`);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('Username');
        navigate('/login');
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    },[navigate])

    return (
        <>
            <h1>SUPERVISOR VISTA DE PRUEBA</h1>
            <button onClick={handleLogout}>Salir</button>
        </>
    );
}