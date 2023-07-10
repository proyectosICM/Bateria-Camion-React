import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useBack({ rutac, rutaop }) {
  const navigate = useNavigate();

  const handleBack = () => {
    const rol = localStorage.getItem('rol');
    if (rol === 'CONDUCTOR') {
      navigate(rutac);
    } else {
      navigate(rutaop);
    }
  };

  return handleBack;
}