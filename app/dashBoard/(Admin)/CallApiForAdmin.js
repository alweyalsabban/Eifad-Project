import { ApiFetchServer } from "@/app/lib/ApiFetchServer";
/// user Management

export async function UseManagmentAPI(NameApi, Data) {
  if (NameApi === "GetAllUser") {
    const res = await ApiFetchServer(
      `/admin/users?search=${Data?.search}&role=${Data?.role}&account_status=${Data?.status}&verification_status=${Data?.verificationStatus}&user_status=${Data?.userStatus}`,
    );
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
