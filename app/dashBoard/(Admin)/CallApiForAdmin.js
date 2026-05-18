import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
/// user Management

export async function UseManagmentAPI(NameApi, Data) {
  if (NameApi === "GetAllUser") {
    const query = new URLSearchParams();
    if (Data?.search) query.append("search", Data.search);
    if (Data?.role) query.append("role", Data.role);
    if (Data?.status) query.append("status", Data.status);
    /*   
    if (Data?.verificationStatus)
      query.append("verification_status", Data.verificationStatus);
    if (Data?.userStatus) query.append("user_status", Data.userStatus); */

    const res = await ApiFetchServer(`/admin/users?${query.toString()}`);
    console.log(res);
    return res;
  }

  if (NameApi === "BlocUser") {
    const res = await ApiFetchServer(
      `/admin/users/${Data.IdUser}/block`,
      "POST",
      {
        reason: "Admin Block Him",
      },
    );
    return res;
  }

  if (NameApi === "UnBlocUser") {
    const res = await ApiFetchServer(
      `/admin/users/${Data.IdUser}/unblock`,
      "POST",
    );
    return res;
  }

  if (NameApi === "DeatilCv") {
    const res = await ApiFetchServer(`/users/${Data.UserId}/profile`);
    return res;
  }

  if (NameApi === "EditUser") {
    const res = await ApiFetchServer(`/admin/users/${Data.idUser}`, "PUT", {
      full_name: Data.fullName,
      email: Data.email,
      is_verified: Data.isValidate,
    });
    return res;
  }
}
