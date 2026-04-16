import { ApiFetchServer } from "../../lib/ApiFetchServer";
import { toast } from "react-toastify";

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
      });
    } catch (error) {
      throw new Error(`Error from Profile Function : ${error}`);
    }
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
      if (!dataCv.objectEducation.length === 0) {
        for (let i = 0; i < dataCv.Length; i++) {
          const res = await ApiFetchServer(
            `/cvs/${dataCv.id}/education/${dataCv?.objectEducation[i]?.EducationID}`,
            "PUT",
            {
              institution: dataCv?.objectEducation[i]?.Institution,
              degree_name: dataCv?.objectEducation[i]?.DegreeName,
              major: dataCv?.objectEducation[i]?.Major,
              graduation_year: dataCv?.objectEducation[i]?.GraduationYear,
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
        await ApiFetchServer(
          `/cvs/${dataCv.id}/education/${dataCv.DeletedField[i].EducationID}`,
          "DELETE",
        );
      }
    }

    if (NameFunction === "AddExperience") {
      for (let i = dataCv.Length; i < dataCv.objectexperience.length; i++) {
        const res = await ApiFetchServer(
          `/cvs/${dataCv.id}/experience`,
          "POST",
          {
            job_title: dataCv.objectexperience[i].JobTitle,
            company_name: dataCv.objectexperience[i].CompanyName,
            start_date: dataCv.objectexperience[i].StartDate,
            end_date: dataCv.objectexperience[i].EndDate,
            responsibilities: dataCv.objectexperience[i].Responsibilities,
          },
        );
        if (!res.isSusses) {
          toast.error(`${res.dataResponse.message}`);
        }
      }
    }

    if (NameFunction === "EditExperience") {
      if (!dataCv.objectexperience.length === 0) {
        for (let i = 0; i < dataCv.Length; i++) {
          const res = await ApiFetchServer(
            `/cvs/${dataCv.id}/experience/${dataCv.objectexperience[i]?.ExperienceID}`,
            "PUT",
            {
              job_title: dataCv?.objectexperience[i]?.JobTitle,
              company_name: dataCv?.objectexperience[i]?.CompanyName,
              start_date: dataCv?.objectexperience[i]?.StartDate,
              end_date: dataCv?.objectexperience[i]?.EndDate,
              responsibilities: dataCv?.objectexperience[i]?.Responsibilities,
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
        await ApiFetchServer(
          `/cvs/${dataCv.id}/experience/${dataCv.DeletedField[i].ExperienceID}`,
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
  } catch (error) {
    throw new Error(error);
  }
}

export async function JobApplication(NameFunction, JobData) {
  if (NameFunction === "GetAllJob") {
    const res = await ApiFetchServer(
      `/jobs?search=${JobData.search}&location=${JobData.location}&work_type=${JobData.work_type}&workplace_type=${JobData.workplace_type}
      &salary_min=${JobData.salary_min}&salary_max=${JobData.salary_max}&company_id=${JobData.company_id}&skill_ids=${JobData.skill_ids}
      &industry=${JobData.industry}&sort=${JobData.sort}&per_page=${JobData.per_page}`,
    );
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
}

export async function Companies(NameFunction, CompaniesData) {
  if (NameFunction === "GetAllFollwPage") {
    const res = await ApiFetchServer("/companies/following");
    return res.dataResponse.data;
  }
}
