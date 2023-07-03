import React from "react";
import { useNavigate } from "react-router-dom";

export function MenuCamion() {
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

    return (
        <>
            <h1>Supervisor</h1>
            <button onClick={handleLogout}>Salir</button>
        </>
    );
}