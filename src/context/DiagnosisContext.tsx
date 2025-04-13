
import React, { createContext, useContext, useState } from "react";

interface DiagnosisContextType {
  triggerFileUpload: () => void;
  setTriggerFileUpload: (callback: () => void) => void;
  useCameraMode: boolean;
  setUseCameraMode: (mode: boolean) => void;
}

const DiagnosisContext = createContext<DiagnosisContextType>({
  triggerFileUpload: () => {},
  setTriggerFileUpload: () => {},
  useCameraMode: false,
  setUseCameraMode: () => {},
});

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [triggerFileUpload, setTriggerFileUploadState] = useState<() => void>(() => {});
  const [useCameraMode, setUseCameraMode] = useState(false);

  return (
    <DiagnosisContext.Provider
      value={{
        triggerFileUpload,
        setTriggerFileUpload: setTriggerFileUploadState,
        useCameraMode,
        setUseCameraMode,
      }}
    >
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => useContext(DiagnosisContext);
