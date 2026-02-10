"use client";
import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePhone } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { useState } from "react";

function RegesterPage() {
  const [form, setForm] = useState({
    name: "",
    gmail: "",
    password: "",
    ensurePassword: "",
    phoneNumber: "",
  });
  const [isManager, setManager] = useState(false);

  return (
    <>
      <div className="w-full h-11 bg-[#F0FDFA] flex justify-between px-4 sm:px-5 text-[#617989] gap-2 mt-5 rounded-b-lg">
        <button
          className={`w-1/2 hover:cursor-pointer ${isManager && "btnActiveSing"}`}
          onClick={() => setManager(true)}
        >
          للمدراء
        </button>
        <button
          className={`w-1/2 hover:cursor-pointer ${!isManager && "btnActiveSing"}`}
          onClick={() => setManager(false)}
        >
          باحث عن عمل
        </button>
      </div>

      <form action="" className="flex flex-col mt-4 w-full">
        <label htmlFor="">الاسم الكامل</label>
        <div className="relative mt-4">
          <input
            type="text"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="الاسم الكامل"
            value={form.name}
            required
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
          <IoPersonOutline className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>

        <label htmlFor="" className="mt-2">
          البريد الإلكتروني
        </label>
        <div className="relative mt-4">
          <input
            type="email"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="البريد الإلكتروني"
            value={form.gmail}
            required
            onChange={(e) => {
              setForm({ ...form, gmail: e.target.value });
            }}
          />
          <CgMail className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>

        <label htmlFor="" className="mt-2">
          كلمة المرور
        </label>
        <div className="relative mt-4">
          <input
            type="password"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="كلمة المرور"
            value={form.password}
            required
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <RiLockPasswordLine className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>

        <label htmlFor="" className="mt-2">
          تأكيد كلمة المرور
        </label>
        <div className="relative mt-4">
          <input
            type="password"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="تأكيد كلمة المرور"
            value={form.ensurePassword}
            required
            onChange={(e) => {
              setForm({ ...form, ensurePassword: e.target.value });
            }}
          />
          <RiLockPasswordLine className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>

        <label htmlFor="" className="mt-2">
          رقم الجوال
        </label>
        <div className="relative mt-4">
          <input
            type="text"
            className="border border-auxiliaryColorGray rounded-lg w-full h-10 pl-10 pr-10"
            placeholder="رقم الجوال"
            value={form.phoneNumber}
            required
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              setForm({ ...form, phoneNumber: onlyNumbers });
            }}
          />
          <MdOutlinePhone className="absolute top-1/2 -translate-y-1/2 right-3 text-[#617989]" />
        </div>

        <input
          type="submit"
          value="إنشاء حساب"
          className="w-full h-12 bg-primaryColorBlue text-auxiliaryColorWhite font-bold rounded-lg 
          hover:cursor-pointer hover:scale-105 duration-500 shadow-[0px_4px_6px_-4px_rgba(1,107,126,0.3),0px_10px_15px_-3px_rgba(1,107,126,0.3)] mt-4"
        />
      </form>

      <div>
        <div className="relative">
          <hr className="mt-8" />
          <h1 className="absolute left-1/2 -translate-x-1/2 -top-3 bg-auxiliaryColorWhite px-3 text-center text-[#94A3B8]">
            أو سجل بواسطة
          </h1>
        </div>

        <div className="flex items-center justify-between w-full max-w-90 m-auto mt-6">
          <a href="#">
            <FcGoogle size={40} />
          </a>
          <a href="#">
            <FaFacebook size={40} color="blue" />
          </a>
          <a href="#">
            <FaApple size={40} />
          </a>
        </div>
      </div>
    </>
  );
}

export default RegesterPage;
