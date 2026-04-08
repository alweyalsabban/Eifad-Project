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
