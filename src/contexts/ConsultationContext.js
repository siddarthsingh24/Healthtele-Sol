// src/contexts/ConsultationContext.js
import React, { createContext, useContext, useState } from 'react';

const ConsultationContext = createContext();

export const ConsultationProvider = ({ children }) => {
  const [consultations, setConsultations] = useState([]);

  return (
    <ConsultationContext.Provider value={{ consultations, setConsultations }}>
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => useContext(ConsultationContext);
