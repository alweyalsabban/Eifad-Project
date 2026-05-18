"use client";

import { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { toast } from "react-toastify";
import ActionCard from "./ActionCard";
import { ApiUploadCv } from "@/app/lib/ApiUploadCv";
import { useRouter } from "next/navigation";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
import { UpdateCv } from "../../callFunctionsForJobseeker";
import { title } from "process";
import { useUpdateCvValue } from "../../context/UpdateCvValue";

function CvUpload() {
  const router = useRouter();
  async function fillCVData(
    summary = null,
    objectEducation = [],
    objectexperience = [],
    objectSkills = [],
    objectLanguage = [],
    objectCertificates = [],
  ) {
    console.log("summary", summary);
    console.log("objectEducation", objectEducation);
    console.log("objectexperience", objectexperience);
    console.log("objectSkills", objectSkills);
    console.log("objectLanguage", objectLanguage);
    console.log("objectCertificates", objectCertificates);
    const mappedEducation = (objectEducation || []).map((edu) => ({
      DegreeName:
        edu?.degree_name || edu?.degree || edu?.DegreeName || "غير مذكور",
      Institution: edu?.institution || edu?.Institution || "غير مذكور",
      Major: edu?.major || edu?.Major || "غير مذكور",
      GraduationYear: edu?.graduation_year || edu?.GraduationYear || "",
    }));

    const mappedExperience = (objectexperience || []).map((exp) => ({
      JobTitle: exp?.job_title || exp?.JobTitle || "غير مذكور",
      CompanyName:
        exp?.company_name || exp?.company || exp?.CompanyName || "غير مذكور",
      StartDate: exp?.start_date || exp?.StartDate || "",
      EndDate: exp?.end_date || exp?.EndDate || "",
      Responsibilities:
        exp?.responsibilities || exp?.Responsibilities || "غير مذكور",
      IsCurrent: exp?.is_current || exp?.IsCurrent || false,
    }));

    const uniqueSkillsMap = new Map();
    (objectSkills || []).forEach((skill, index) => {
      const skillName =
        typeof skill === "string"
          ? skill
          : skill?.skill_name ||
            skill?.name ||
            skill?.SkillName ||
            skill?.skill?.SkillName ||
            "";

      const safeName = skillName || "غير مذكور";
      const lowerName = safeName.toLowerCase().trim();

      if (!uniqueSkillsMap.has(lowerName)) {
        uniqueSkillsMap.set(lowerName, {
          CVSkillID: Date.now() + index,
          SkillID: null,
          SkillLevel: skill?.skill_level || skill?.SkillLevel || "Beginner",
          skill: {
            CategoryID: skill?.category_id || skill?.CategoryID || 1,
            SkillID: null,
            SkillName: safeName,
          },
        });
      }
    });
    const mappedSkills = Array.from(uniqueSkillsMap.values());

    const uniqueLanguagesMap = new Map();
    (objectLanguage || []).forEach((lang, index) => {
      const langName =
        typeof lang === "string"
          ? lang
          : lang?.language_name ||
            lang?.name ||
            lang?.LanguageName ||
            lang?.language?.LanguageName ||
            "";

      const safeName = langName || "غير مذكور";
      const lowerName = safeName.toLowerCase().trim();

      if (!uniqueLanguagesMap.has(lowerName)) {
        uniqueLanguagesMap.set(lowerName, {
          LanguageID: null,
          LanguageLevel:
            lang?.language_level || lang?.LanguageLevel || "Beginner",
          language: {
            LanguageName: safeName,
          },
        });
      }
    });
    const mappedLanguages = Array.from(uniqueLanguagesMap.values());

    const mappedCertificates = (objectCertificates || []).map((cert) => ({
      CertificateName:
        cert?.certificate_name ||
        cert?.name ||
        cert?.CertificateName ||
        "غير مذكور",
      IssuingOrganization:
        cert?.issuing_organization ||
        cert?.organization ||
        cert?.IssuingOrganization ||
        "غير مذكور",
      IsVerified: cert?.is_verified || cert?.IsVerified || false,
      FilePath: cert?.file_path || cert?.cloudinary_url || cert?.FilePath || "",
    }));

    setSummary(summary || "");
    setObjectEducation(mappedEducation);
    setexperience(mappedExperience);
    setObjectSkills(mappedSkills);
    setObjectLanguage(mappedLanguages);
    setObjectCertificates(mappedCertificates);
    router.replace("/dashBoard/cv");
  }

  const inputRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const {
    setSummary,
    setObjectEducation,
    setexperience,
    setObjectSkills,
    setObjectLanguage,
    setObjectCertificates,
    setObjectCustomSections,
  } = useUpdateCvValue();

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
        response.dataResponse.data.languages,
        response.dataResponse.data.certifications,
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
