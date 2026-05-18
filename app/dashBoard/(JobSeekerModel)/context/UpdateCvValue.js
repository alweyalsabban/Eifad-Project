"use client";
import { createContext, useContext, useState } from "react";

export const UpdateCvValueContext = createContext();

export const UpdateCvValueProvider = ({ children }) => {
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [objectEducation, setObjectEducation] = useState([]);
  const [objectexperience, setexperience] = useState([]);
  const [objectSkills, setObjectSkills] = useState([]);
  const [objectLanguage, setObjectLanguage] = useState([]);
  const [objectCertificates, setObjectCertificates] = useState([]);
  const [objectCustomSections, setObjectCustomSections] = useState([]);

  return (
    <UpdateCvValueContext.Provider
      value={{
        summary,
        setSummary,
        title,
        setTitle,
        objectEducation,
        setObjectEducation,
        objectexperience,
        setexperience,
        objectSkills,
        setObjectSkills,
        objectLanguage,
        setObjectLanguage,
        objectCertificates,
        setObjectCertificates,
        objectCustomSections,
        setObjectCustomSections,
      }}
    >
      {children}
    </UpdateCvValueContext.Provider>
  );
};

export const useUpdateCvValue = () => {
  const context = useContext(UpdateCvValueContext);

  if (!context) {
    throw new Error(
      "useUpdateCvValue must be used inside UpdateCvValueProvider",
    );
  }

  return context;
};
