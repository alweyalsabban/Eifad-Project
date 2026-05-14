"use client";

import { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { toast } from "react-toastify";
import ActionCard from "./ActionCard";
import { ApiUploadCv } from "@/app/lib/ApiUploadCv";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import { UpdateCv } from "../../callFunctionsForJobseeker";
import { title } from "process";

async function fillCVData(
  summary = null,
  objectEducation = [],
  objectexperience = [],
  objectCertificates = [],
  objectSkills = [],
  objectLanguage = [],
) {
  const response = await ApiFetchServer("/cvs");
  const cvId = await response.dataResponse.data[0].CVID;
  if (title !== null && summary !== null) {
    await UpdateCv("EditProfCv", {
      id: cvId,
      Summary: summary,
    });
  }

  if (objectEducation.length > 0) {
    const res = await UpdateCv("AddEducation", {
      id: cvId,
      Length: 0,
      objectEducation: objectEducation,
    });
  }

  if (objectexperience.length > 0) {
    await UpdateCv("AddExperience", {
      id: cvId,
      Length: 0,
      objectexperience: objectexperience,
    });
  }

  /*
    if (objectCertificates.length > 0) {
    await UpdateCv("AddCertificate", {
      id: cvId,
      Length: 0,
      objectCertificates: objectCertificates,
    });
  }
    
  console.log("objectSkills", objectSkills);
  if (objectSkills.length > 0) {
    await UpdateCv("AddSkill", {
      id: cvId,
      Length: 0,
      objectSkills: objectSkills,
      oldObjectSkil: [],
    });
  }

  if (objectLanguage.length > 0) {
    await UpdateCv("AddLanguage", {
      id: cvId,
      Length: 0,
      objectLanguage: objectLanguage,
    });
  }
  

   */
  /* 
  await UpdateCv("AddCustomSection", {
    id: cvId,
    Length: savedCustomSectionsCount,
    objectCustomSections: customSections,
  }); */
}

function CvUpload() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const handleButtonClick = () => {
    if (status === "uploading") return;
    inputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setStatus("error");
      toast.error("يرجى اختيار ملف PDF فقط");
      input.value = "";
      return;
    }

    const toastId = toast.loading("جاري رفع الملف...");

    try {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      // هنا نرسل معاملين فقط
      const response = await ApiUploadCv("/cvs/parse", formData);

      if (!response.isSuccess) {
        throw new Error(response.dataResponse?.message || "فشل رفع الملف");
      }

      console.log("Parsed CV Data:", response.dataResponse);
      await fillCVData(
        response.dataResponse.data.summary,
        response.dataResponse.data.education,
        response.dataResponse.data.experiences,
        response.dataResponse.data.skills,
      );

      setStatus("success");

      toast.update(toastId, {
        render: "تم رفع السيرة الذاتية بنجاح",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } catch (error) {
      setStatus("error");

      toast.update(toastId, {
        render: error.message || "حدث خطأ أثناء رفع السيرة الذاتية",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
    } finally {
      input.value = "";

      setTimeout(() => {
        setStatus("idle");
      }, 500);
    }
  };

  return (
    <div className="w-full h-full">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleButtonClick}
        disabled={status === "uploading"}
        className="w-full h-full block text-start disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ActionCard
          icons={
            <LuUpload size={45} className="text-primaryBlue p-2 rounded-xl" />
          }
          name={status === "uploading" ? "جاري الرفع..." : "رفع السيرة الذاتية"}
        />
      </button>
    </div>
  );
}

export default CvUpload;
