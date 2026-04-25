import { ApiFetchServer } from "../../lib/ApiFetchServer";

function unwrap(res) {
  const data = res?.dataResponse?.data ?? res?.dataResponse ?? null;

  return data;
}

export async function Profile(NameFunction, dataProfile) {
  try {
    if (NameFunction === "GetAllJobPosted")
      return unwrap(await ApiFetchServer("/employer/jobs"));
    if (NameFunction === "GetSkills")
      return unwrap(await ApiFetchServer("/skills"));
    if (NameFunction === "CreateSkill")
      return unwrap(await ApiFetchServer("/skills", "POST", dataProfile));
    if (NameFunction === "CreateJob")
      return unwrap(
        await ApiFetchServer("/employer/jobs", "POST", dataProfile),
      );
    if (NameFunction === "UpdateJob")
      return unwrap(
        await ApiFetchServer(
          `/employer/jobs/${dataProfile.id}`,
          "PUT",
          dataProfile.payload,
        ),
      );
    if (NameFunction === "PublishJob")
      return unwrap(
        await ApiFetchServer(`/employer/jobs/${dataProfile}/publish`, "POST"),
      );
    if (NameFunction === "CloseJob")
      return unwrap(
        await ApiFetchServer(`/employer/jobs/${dataProfile}/close`, "POST"),
      );
    if (NameFunction === "GetJobApplications")
      return unwrap(
        await ApiFetchServer(`/employer/jobs/${dataProfile}/applications`),
      );
    if (NameFunction === "UpdateApplicationStatus") {
      return unwrap(
        await ApiFetchServer(
          `/employer/applications/${dataProfile.id}/status`,
          "PUT",
          dataProfile.payload,
        ),
      );
    }

    if (NameFunction === "GetApplicationAiMatch") {
      return unwrap(
        await ApiFetchServer(`/applications/${dataProfile}/ai-match`),
      );
    }

    if (NameFunction === "SearchEmployees") {
      return unwrap(await ApiFetchServer(dataProfile));
    }

    if (NameFunction === "GetEmployeeProfile") {
      return unwrap(
        await ApiFetchServer(`/employer/job-seekers/${dataProfile}`),
      );
    }
    if (NameFunction === "GetMe") {
      const res = await ApiFetchServer("/auth/me");
      return res.dataResponse?.data ?? res.dataResponse;
    }

    if (NameFunction === "GetVerificationDocuments") {
      const res = await ApiFetchServer("/employer/verification-documents");
      return res.dataResponse?.data ?? res.dataResponse;
    }

    if (NameFunction === "UploadVerificationDocument") {
      const res = await ApiFetchServer(
        `/employer/verification-documents/${dataProfile.type}`,
        "POST",
        dataProfile.formData,
        true,
      );
      return res.dataResponse?.data ?? res.dataResponse;
    }

    if (NameFunction === "DeleteJob") {
      return unwrap(
        await ApiFetchServer(`/employer/jobs/${dataProfile}`, "DELETE"),
      );
    }
    return null;
  } catch (error) {
    throw new Error(`Error from Profile Function : ${error}`);
  }
}
