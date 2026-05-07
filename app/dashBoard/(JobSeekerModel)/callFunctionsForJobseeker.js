import { ApiFetchServer } from "../../lib/ApiFetchServer";
import { toast } from "react-toastify";
import { ApiForm } from "../../lib/ApiForm";
const getEducationId = (item) =>
  item?.EducationID ?? item?.education_id ?? item?.id ?? null;

const getExperienceId = (item) =>
  item?.ExperienceID ?? item?.experience_id ?? item?.id ?? null;
const getSectionId = (section) =>
  section?.CustomSectionID ??
  section?.SectionID ??
  section?.sectionId ??
  section?.id ??
  null;

const buildCustomSectionPayload = (section) => {
  const cleanItems = (section?.Items ?? [])
    .map((item) => item?.trim())
    .filter(Boolean);

  return {
    SectionType: section?.SectionName,
    Title: section?.SectionName,
    Description: cleanItems.join("\n\n"),
    content_data: cleanItems.reduce((accumulator, item, index) => {
      accumulator[`item_${index + 1}`] = item;
      return accumulator;
    }, {}),
  };
};
export async function Profile(NameFunction, dataProfile) {
  if (NameFunction === "EditProfile") {
    //name, phone, personalPhoto, location,profile_summary,
    try {
      await ApiFetchServer("/profile", "PUT", {
        full_name: dataProfile.name,
        phone: dataProfile.phone,
        personal_photo: dataProfile.personalPhoto,
        location: dataProfile.location,
        profile_summary: dataProfile.profile_summary,
        personal_photo: dataProfile.personal_photo,
      });
    } catch (error) {
      throw new Error(`Error from Profile Function : ${error}`);
    }
  }
  if (NameFunction === "MainInfoUser") {
    const res = await ApiFetchServer("/auth/me");
    return res.dataResponse.data;
  }
}

export async function UpdateCv(NameFunction, dataCv) {
  if (NameFunction === "CreateProfCv") {
    await ApiFetchServer(`/cvs`, "POST", {
      title: dataCv.Title,
      personal_summary: dataCv.Summary,
    });
  }

  try {
    if (NameFunction === "EditProfCv") {
      await ApiFetchServer(`/cvs/${dataCv.id}`, "PUT", {
        title: dataCv.Title,
        personal_summary: dataCv.Summary,
      });
    }

    if (NameFunction === "EditEducation") {
      if (dataCv.objectEducation.length !== 0) {
        for (let i = 0; i < dataCv.Length; i++) {
          const item = dataCv?.objectEducation?.[i];
          const educationId = getEducationId(item);

          if (!item || !educationId) continue;

          const res = await ApiFetchServer(
            `/cvs/${dataCv.id}/education/${educationId}`,
            "PUT",
            {
              institution: item?.Institution ?? "",
              degree_name: item?.DegreeName ?? "",
              major: item?.Major ?? "",
              graduation_year: item?.GraduationYear ?? "",
            },
          );

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
          }
        }
      }
    }

    if (NameFunction === "AddEducation") {
      for (let i = dataCv.Length; i < dataCv.objectEducation.length; i++) {
        const res = await ApiFetchServer(
          `/cvs/${dataCv.id}/education`,
          "POST",
          {
            institution: dataCv.objectEducation[i].Institution,
            degree_name: dataCv.objectEducation[i].DegreeName,
            major: dataCv.objectEducation[i].Major,
            graduation_year: dataCv.objectEducation[i].GraduationYear,
          },
        );

        if (!res.isSusses) {
          toast.error(`${res.dataResponse.message}`);
        }
      }
    }

    if (NameFunction === "DeleteEducation") {
      for (let i = 0; i < dataCv.DeletedField.length; i++) {
        const educationId = getEducationId(dataCv.DeletedField[i]);
        if (!educationId) continue;

        await ApiFetchServer(
          `/cvs/${dataCv.id}/education/${educationId}`,
          "DELETE",
        );
      }
    }

    if (NameFunction === "AddExperience") {
      for (let i = dataCv.Length; i < dataCv.objectexperience.length; i++) {
        const item = dataCv.objectexperience[i];

        const res = await ApiFetchServer(
          `/cvs/${dataCv.id}/experience`,
          "POST",
          {
            job_title: item?.JobTitle ?? "",
            company_name: item?.CompanyName ?? "",
            start_date: item?.StartDate || null,
            end_date: item?.IsCurrent ? null : item?.EndDate || null,
            responsibilities: item?.Responsibilities ?? "",
          },
        );

        if (!res.isSusses) {
          toast.error(`${res.dataResponse.message}`);
        }
      }
    }
    if (NameFunction === "EditExperience") {
      if (dataCv.objectexperience.length !== 0) {
        for (let i = 0; i < dataCv.Length; i++) {
          const item = dataCv?.objectexperience?.[i];
          const experienceId = getExperienceId(item);

          if (!item || !experienceId) continue;

          const res = await ApiFetchServer(
            `/cvs/${dataCv.id}/experience/${experienceId}`,
            "PUT",
            {
              job_title: item?.JobTitle ?? "",
              company_name: item?.CompanyName ?? "",
              start_date: item?.StartDate || null,
              end_date: item?.IsCurrent ? null : item?.EndDate || null,
              responsibilities: item?.Responsibilities ?? "",
            },
          );

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
          }
        }
      }
    }

    if (NameFunction === "DeleteExperience") {
      for (let i = 0; i < dataCv.DeletedField.length; i++) {
        const experienceId = getExperienceId(dataCv.DeletedField[i]);
        if (!experienceId) continue;

        await ApiFetchServer(
          `/cvs/${dataCv.id}/experience/${experienceId}`,
          "DELETE",
        );
      }
    }
    if (NameFunction === "AddSkill") {
      for (let i = 0; i < dataCv.oldObjectSkil.length; i++) {
        await ApiFetchServer(
          `/cvs/${dataCv.id}/skills/${dataCv?.oldObjectSkil[i]?.SkillID}`,
          "DELETE",
        );
      }

      for (let i = 0; i < dataCv?.objectSkills?.length; i++) {
        if (dataCv.objectSkills[i].SkillID === null) {
          const res = await ApiFetchServer(`/skills`, "POST", {
            skill_name: dataCv.objectSkills[i].skill.SkillName,
            category_id: dataCv.objectSkills[i].skill.CategoryID,
          });

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
            continue;
          }

          // خذ ID المهارة الجديدة من الرد
          const newSkillId = res.dataResponse.data.SkillID;

          // اربطها بالـ CV
          const cvSkillRes = await ApiFetchServer(
            `/cvs/${dataCv.id}/skills`,
            "POST",
            {
              skill_id: newSkillId,
              skill_level: dataCv.objectSkills[i].SkillLevel,
            },
          );

          if (!cvSkillRes.isSusses) {
            toast.error(`${cvSkillRes.dataResponse.message}`);
          }
        } else {
          const res = await ApiFetchServer(`/cvs/${dataCv.id}/skills`, "POST", {
            skill_id: dataCv.objectSkills[i].SkillID,
            skill_level: dataCv.objectSkills[i].SkillLevel,
          });

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
          }
        }
      }
    }

    if (NameFunction === "AddLanguage") {
      for (let i = dataCv.Length; i < dataCv.objectLanguage.length; i++) {
        const item = dataCv.objectLanguage[i];

        if (item.LanguageID === null) {
          const res = await ApiFetchServer(`/languages`, "POST", {
            language_name: item.language.LanguageName,
          });

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
            continue;
          }

          const newLanguageId = res.dataResponse.data.LanguageID;

          const cvLanguageRes = await ApiFetchServer(
            `/cvs/${dataCv.id}/languages`,
            "POST",
            {
              language_id: newLanguageId,
              language_level: item.LanguageLevel,
            },
          );

          if (!cvLanguageRes.isSusses) {
            toast.error(`${cvLanguageRes.dataResponse.message}`);
          }
        } else {
          const res = await ApiFetchServer(
            `/cvs/${dataCv.id}/languages`,
            "POST",
            {
              language_id: item.LanguageID,
              language_level: item.LanguageLevel,
            },
          );

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
          }
        }
      }
    }

    if (NameFunction === "EditLanguage") {
      if (dataCv.objectLanguage.length !== 0) {
        for (let i = 0; i < dataCv.Length; i++) {
          const item = dataCv.objectLanguage[i];

          if (!item) continue;

          // لو المستخدم غيّر الاسم إلى لغة جديدة
          if (item.LanguageID === null) {
            // أنشئ اللغة الجديدة
            const createLangRes = await ApiFetchServer(`/languages`, "POST", {
              language_name: item.language.LanguageName,
            });

            if (!createLangRes.isSusses) {
              toast.error(`${createLangRes.dataResponse.message}`);
              continue;
            }

            const newLanguageId = createLangRes.dataResponse.data.LanguageID;

            // حدّث لغة الـ CV الحالية إلى اللغة الجديدة
            const updateRes = await ApiFetchServer(
              `/cvs/${dataCv.id}/languages/${dataCv.oldObjectLanguage[i].LanguageID}`,
              "PUT",
              {
                language_id: newLanguageId,
                language_level: item.LanguageLevel,
              },
            );

            if (!updateRes.isSusses) {
              toast.error(`${updateRes.dataResponse.message}`);
            }
          } else {
            // تعديل مستوى اللغة أو اختيار لغة موجودة
            const res = await ApiFetchServer(
              `/cvs/${dataCv.id}/languages/${dataCv.oldObjectLanguage[i].LanguageID}`,
              "PUT",
              {
                language_id: item.LanguageID,
                language_level: item.LanguageLevel,
              },
            );

            if (!res.isSusses) {
              toast.error(`${res.dataResponse.message}`);
            }
          }
        }
      }
    }

    if (NameFunction === "DeleteLanguage") {
      for (let i = 0; i < dataCv.DeletedField.length; i++) {
        await ApiFetchServer(
          `/cvs/${dataCv.id}/languages/${dataCv.DeletedField[i].LanguageID}`,
          "DELETE",
        );
      }
    }

    if (NameFunction === "EditCertificate") {
      if (dataCv.objectCertificates.length !== 0) {
        for (let i = 0; i < dataCv.Length; i++) {
          const item = dataCv.objectCertificates[i];

          if (!item?.CertificationID) continue;

          const res = await ApiFetchServer(
            `/cvs/${dataCv.id}/certifications/${item.CertificationID}`,
            "PUT",
            {
              certificate_name: item.CertificateName,
              issuing_organization: item.IssuingOrganization,
              is_verified: item.IsVerified,
            },
          );

          if (!res.isSusses) {
            toast.error(`${res.dataResponse.message}`);
          }
        }
      }
    }

    if (NameFunction === "AddCertificate") {
      for (let i = dataCv.Length; i < dataCv.objectCertificates.length; i++) {
        const item = dataCv.objectCertificates[i];

        const res = await ApiFetchServer(
          `/cvs/${dataCv.id}/certifications`,
          "POST",
          {
            certificate_name: item.CertificateName,
            issuing_organization: item.IssuingOrganization,
            is_verified: item.IsVerified,
          },
        );

        if (!res.isSusses) {
          toast.error(`${res.dataResponse.message}`);
        }
      }
    }

    if (NameFunction === "DeleteCertificate") {
      for (let i = 0; i < dataCv.DeletedField.length; i++) {
        await ApiFetchServer(
          `/cvs/${dataCv.id}/certifications/${dataCv.DeletedField[i].CertificationID}`,
          "DELETE",
        );
      }
    }

    if (NameFunction === "EditCustomSection") {
      for (let i = 0; i < dataCv.Length; i++) {
        const currentSection = dataCv?.objectCustomSections?.[i];
        const sectionId = getSectionId(currentSection);

        if (!currentSection || !sectionId) continue;

        const res = await ApiFetchServer(
          `/cvs/${dataCv.id}/custom-sections/${sectionId}`,
          "PUT",
          buildCustomSectionPayload(currentSection),
        );

        if (!res.isSusses) {
          toast.error(`${res.dataResponse.message}`);
        }
      }
    }

    if (NameFunction === "AddCustomSection") {
      const createdSections = [];

      for (let i = dataCv.Length; i < dataCv.objectCustomSections.length; i++) {
        const currentSection = dataCv.objectCustomSections[i];
        const res = await ApiFetchServer(
          `/cvs/${dataCv.id}/custom-sections`,
          "POST",
          buildCustomSectionPayload(currentSection),
        );

        if (!res.isSusses) {
          toast.error(`${res.dataResponse.message}`);
          continue;
        }

        createdSections.push(res.dataResponse?.data ?? {});
      }

      return createdSections;
    }

    if (NameFunction === "DeleteCustomSection") {
      for (let i = 0; i < dataCv.DeletedField.length; i++) {
        const sectionId = getSectionId(dataCv.DeletedField[i]);
        if (!sectionId) continue;

        await ApiFetchServer(
          `/cvs/${dataCv.id}/custom-sections/${sectionId}`,
          "DELETE",
        );
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function JobApplication(NameFunction, JobData) {
  /*  if (NameFunction === "GetAllJob") {
    const res = await ApiFetchServer(
      `/jobs?search=${JobData.search}&location=${JobData.location}&work_type=${JobData.work_type}&workplace_type=${JobData.workplace_type}
      &salary_min=${JobData.salary_min}&salary_max=${JobData.salary_max}&company_id=${JobData.company_id}&skill_ids=${JobData.skill_ids}
      &industry=${JobData.industry}&sort=${JobData.sort}&per_page=${JobData.per_page}`,
    );
    return res.dataResponse.data;
  } */
  if (NameFunction === "GetAllJob") {
    const workTypeMap = {
      full_time: "Full-time",
      part_time: "Part-time",
      contract: "Contract",
      internship: "Internship",
    };

    const workplaceTypeMap = {
      onsite: "On-site",
      remote: "Remote",
      hybrid: "Hybrid",
    };

    const query = new URLSearchParams();

    if (JobData.search) query.set("search", JobData.search);
    if (JobData.location) query.set("location", JobData.location);

    if (JobData.work_type) {
      query.set(
        "work_type",
        workTypeMap[JobData.work_type] ?? JobData.work_type,
      );
    }

    if (JobData.workplace_type) {
      query.set(
        "workplace_type",
        workplaceTypeMap[JobData.workplace_type] ?? JobData.workplace_type,
      );
    }

    if (JobData.salary_min) query.set("salary_min", JobData.salary_min);
    if (JobData.salary_max) query.set("salary_max", JobData.salary_max);
    if (JobData.company_id) query.set("company_id", JobData.company_id);
    if (JobData.skill_ids) query.set("skill_ids", JobData.skill_ids);
    if (JobData.industry) query.set("industry", JobData.industry);
    if (JobData.sort) query.set("sort", JobData.sort);
    if (JobData.per_page) query.set("per_page", JobData.per_page);

    const res = await ApiFetchServer(`/jobs?${query.toString()}`);
    return res.dataResponse.data;
  }

  if (NameFunction === "GetDeatilJob") {
    const res = await ApiFetchServer(`/jobs/${JobData}`);

    return res.dataResponse.data;
  }

  if (NameFunction === "GetCVInfo") {
    const res = await ApiFetchServer("/cvs");
    return res.dataResponse.data[0];
  }
  if (NameFunction === "AutoAppleyJob") {
    const res = await ApiFetchServer("/applications", "POST", {
      job_id: JobData.JobID,
      cv_id: JobData.CVID,
      notes: "",
    });
    return res;
  }

  if (NameFunction === "ManualAppleyJob") {
    const res = await ApiForm("/applications", "POST", JobData);
    return res;
  }

  if (NameFunction === "MakeFavoritJob") {
    const res = await ApiFetchServer(`/favorites/${JobData.jobId}`, "POST");
    return res;
  }
  if (NameFunction === "RemoveFavoritJob") {
    const res = await ApiFetchServer(`/favorites/${JobData.jobId}`, "DELETE");
    return res;
  }
  if (NameFunction === "favorites") {
    const res = await ApiFetchServer(`/favorites`);
    return res;
  }
  if (NameFunction === "CalMatchAiJob") {
    const res = await ApiFetchServer(
      `/jobs/${JobData.jobId}/match-score?cv_id=${JobData.CvId}`,
    );
    return res;
  }
  if (NameFunction === "GetAllApplications") {
    const res = await ApiFetchServer(`/applications`);
    return res;
  }

  if (NameFunction === "GetAllSuggestJob") {
    const res = await ApiFetchServer(`/jobs/suggested`);
    return res;
  }
}

export async function Companies(NameFunction, CompaniesData) {
  if (NameFunction === "GetAllFollwPage") {
    const res = await ApiFetchServer("/companies/following");
    return res.dataResponse.data;
  }
  if (NameFunction === "GetAllCompanies") {
    const res = await ApiFetchServer(
      `/companies?name=${CompaniesData.name}&location=${CompaniesData.location}&field=${CompaniesData.field}`,
    );

    return res.dataResponse.data;
  }
  if (NameFunction === "CompanyDeatils") {
    const res = await ApiFetchServer(`/companies/${CompaniesData.id}`);

    return res.dataResponse.data;
  }

  if (NameFunction === "FollowPage") {
    const res = await ApiFetchServer(
      `/companies/${CompaniesData.companyId}/follow`,
      "POST",
    );

    return res;
  }
  if (NameFunction === "UnFollowPage") {
    const res = await ApiFetchServer(
      `/companies/${CompaniesData.companyId}/follow`,
      "DELETE",
    );

    return res;
  }
}

export async function RoadMapFuncation(NameFunction, JobData) {
  if (NameFunction === "GetPreRoadMap") {
    const res = await ApiFetchServer("/career-roadmap");
    return res.dataResponse.data;
  }
  if (NameFunction === "CreateNewRoadMap") {
    const res = await ApiFetchServer("/career-roadmap", "POST", {
      target_role: JobData.title,
      cv_id: JobData.idCV,
    });

    return res.dataResponse.data;
  }
}

export async function MarketTrendFunction(NameFunction, JobData) {
  if (NameFunction === "GetAllSectionMajor") {
    const res = await ApiFetchServer("/market-trends/filters");
    return res.dataResponse.industries;
  }

  if (NameFunction === "GetInfoForMaeket") {
    const res = await ApiFetchServer(
      `/market-trends?industry_id=${JobData.id}`,
    );

    return res.dataResponse;
  }
}
