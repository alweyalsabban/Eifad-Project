import { ApiFetchServer } from "../../lib/ApiFetchServer";

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
  try {
    if (NameFunction === "EditProfCv") {
      await ApiFetchServer(`/cvs/${dataCv.id}`, "PUT", {
        title: dataCv.Title,
        personal_summary: dataCv.Summary,
      });
    }

    if (NameFunction === "EditEducation") {
      for (let i = dataCv.Length; i < dataCv.objectEducation.length; i++) {
        await ApiFetchServer(`/cvs/${dataCv.id}/education`, "POST", {
          institution: dataCv.objectEducation[i].Institution,
          degree_name: dataCv.objectEducation[i].DegreeName,
          major: dataCv.objectEducation[i].Major,
          graduation_year: dataCv.objectEducation[i].GraduationYear,
        });
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

    if (NameFunction === "EditExperience") {
      for (let i = dataCv.Length; i < dataCv.objectexperience.length; i++) {
        await ApiFetchServer(`/cvs/${dataCv.id}/experience`, "POST", {
          job_title: dataCv.objectexperience[i].JobTitle,
          company_name: dataCv.objectexperience[i].CompanyName,
          start_date: dataCv.objectexperience[i].StartDate,
          end_date: dataCv.objectexperience[i].EndDate,
          responsibilities: dataCv.objectexperience[i].Responsibilities,
        });
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
