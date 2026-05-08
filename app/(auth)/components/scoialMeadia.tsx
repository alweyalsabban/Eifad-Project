import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { ApiFetchServer } from "@/app/lib/ApiFetchServer";

function ScoialMeadia() {
  const onGoogle = async () => {
    //window.open("/api/auth/login/google", "popup", "width=500,height=600");
    const res = await ApiFetchServer("/auth/login/google");
    window.location.href = res.dataResponse.url;
  };
  const onlinkedin = async () => {
    //window.open("/api/auth/login/linkedin", "popup", "width=500,height=600");
    const res = await ApiFetchServer("/auth/login/linkedin");
    console.log(res);
    window.location.href = res.dataResponse.url;
  };

  return (
    <div className="flex items-center justify-around w-full max-w-90 m-auto mt-6">
      <FcGoogle size={40} onClick={onGoogle} className="hover:cursor-pointer" />

      <FaLinkedin
        size={40}
        color="blue"
        onClick={onlinkedin}
        className="hover:cursor-pointer"
      />
    </div>
  );
}

export default ScoialMeadia;
