import { ApiFetchServer } from "../../lib/ApiFetchServer";
import { toast } from "react-toastify";

export async function Profile(NameFunction, dataProfile) {
  if (NameFunction === "GetAllJobPosted") {
    //name, phone, personalPhoto, location,profile_summary,

    try {
      const res = await ApiFetchServer("/employer/jobs");
      /* console.log(res.dataResponse.data); */
      return res.dataResponse.data;
    } catch (error) {
      throw new Error(`Error from Profile Function : ${error}`);
    }
  }
}
