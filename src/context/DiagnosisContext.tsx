
import React, { createContext, useContext, useState } from "react";

interface DiagnosisContextType {
  triggerFileUpload: () => void;
  setTriggerFileUpload: (callback: () => void) => void;
  useCameraMode: boolean;
  setUseCameraMode: (useCamera: boolean) => void;
}

const DiagnosisContext = createContext<DiagnosisContextType>({
  triggerFileUpload: () => {},
  setTriggerFileUpload: () => {},
  useCameraMode: false,
  setUseCameraMode: () => {},
});

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [triggerFileUpload, setTriggerFileUploadState] = useState<() => void>(() => {});
  const [useCameraMode, setUseCameraMode] = useState<boolean>(false);

  const setTriggerFileUpload = (callback: () => void) => {
    setTriggerFileUploadState(() => callback);
  };

  return (
    <DiagnosisContext.Provider value={{ 
      triggerFileUpload, 
      setTriggerFileUpload,
      useCameraMode,
      setUseCameraMode
    }}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => useContext(DiagnosisContext);
