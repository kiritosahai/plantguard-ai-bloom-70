
import React, { createContext, useContext, useState } from "react";

interface DiagnosisContextType {
  triggerFileUpload: () => void;
  setTriggerFileUpload: (callback: () => void) => void;
}

const DiagnosisContext = createContext<DiagnosisContextType>({
  triggerFileUpload: () => {},
  setTriggerFileUpload: () => {},
});

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [triggerFileUpload, setTriggerFileUploadState] = useState<() => void>(() => {});

  const setTriggerFileUpload = (callback: () => void) => {
    setTriggerFileUploadState(() => callback);
  };

  return (
    <DiagnosisContext.Provider value={{ triggerFileUpload, setTriggerFileUpload }}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => useContext(DiagnosisContext);
